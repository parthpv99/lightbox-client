import React, { useState } from "react";
import { Typography, TextField, Button, Grid, useMediaQuery } from "@material-ui/core";
// import { useHistory } from "react-router-dom";
import { kBaseUrl } from "../../constants";
import { setCookies } from "../../utility";

const RegisterForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [joinBtnDisable, setJoinBtnDisable] = useState(false);
  const [icon1, setIcon1] = useState({ val: "close", color: "red" });
  const [icon2, setIcon2] = useState({ val: "close", color: "red" });
  const [icon3, setIcon3] = useState({ val: "close", color: "red" });
  const [icon4, setIcon4] = useState({ val: "close", color: "red" });
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  // const history = useHistory();

  const handleRegistration = (event) => {
    event.preventDefault();
    setJoinBtnDisable(true);
    setError(false);
    const user = JSON.stringify({ email: email, password: password });
    
    fetch(kBaseUrl + "register", {
      body: user,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      method: "POST",
    })
      .then(async (res) => {
        if (res.status === 200) {
          let accessToken = "access-token";
          let token = res.headers.get(accessToken);
          setCookies(accessToken, token);
        } else {
          if (res.status === 400) setError(true);
          else setError(true);
        }
      })
      .catch((e) => console.log("something went wrong"))
      .finally(() => {
        setJoinBtnDisable(false);
      });
  };

  const passwordHandler = (e) => {
    const pass = e.target.value;
    pass.length < 8
      ? setIcon1({ val: "close", color: "red" })
      : setIcon1({ val: "check", color: "green" });
    pass.match(/(?=.*[A-Z])/)
      ? setIcon2({ val: "check", color: "green" })
      : setIcon2({ val: "close", color: "red" });
    pass.match(/(?=.*\d)/)
      ? setIcon3({ val: "check", color: "green" })
      : setIcon3({ val: "close", color: "red" });
    pass.match(/(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_``{|}~])/)
      ? setIcon4({ val: "check", color: "green" })
      : setIcon4({ val: "close", color: "red" });
    setPassword(pass);
  };

  return (
    <form onSubmit={handleRegistration} style={{ width: "90%" }}>
      <Grid container justify="center">
        <Typography color="error">
          {error && "Invalid Email or Password"}
        </Typography>
      </Grid>
      <TextField
        id="email"
        fullWidth
        autoFocus
        label="Email id"
        variant="outlined"
        style={{ margin: "2% auto" }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        fullWidth
        id="password"
        label="password"
        variant="outlined"
        type="password"
        value={password}
        style={{ margin: "2% auto" }}
        onChange={passwordHandler}
        required
      />

      <Grid container justify="flex-start">
        <Grid
          container
          justify="flex-start"
          alignItems="center"
          style={{ marginBottom: "-5%" }}
        >
          <i
            className="material-icons"
            style={{ fontSize: "1.2rem", color: icon1.color }}
          >
            {icon1.val}
          </i>
          <p> Atleast 8 Characters </p>
        </Grid>
        <Grid
          container
          justify="flex-start"
          alignItems="center"
          style={{ marginBottom: "-5%" }}
        >
          <i
            className="material-icons"
            style={{ fontSize: "1.2rem", color: icon2.color }}
          >
            {icon2.val}
          </i>
          <p> Atleast one capital alphabet </p>
        </Grid>
        <Grid
          container
          justify="flex-start"
          alignItems="center"
          style={{ marginBottom: "-5%" }}
        >
          <i
            className="material-icons"
            style={{ fontSize: "1.2rem", color: icon3.color }}
          >
            {icon3.val}
          </i>
          <p> Atleast one number </p>
        </Grid>
        <Grid container justify="flex-start" alignItems="center">
          <i
            className="material-icons"
            style={{ fontSize: "1.2rem", color: icon4.color }}
          >
            {icon4.val}
          </i>
          <p> Atleast one special character </p>
        </Grid>
      </Grid>

      <Grid container justify="center">
        <Button
          id="registerBtn"
          type="submit"
          color="primary"
          variant="contained"
          style={
            matches
              ? { margin: "3%", width: "30%" }
              : { margin: "3%", width: "50%" }
          }
          disabled={joinBtnDisable}
        >
          Join now
        </Button>
      </Grid>
    </form>
  );
};

export default RegisterForm;
