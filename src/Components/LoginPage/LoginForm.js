import React, { useState } from "react";
import { Typography, TextField, Button, Grid } from "@material-ui/core";
// import { useHistory } from "react-router-dom";
import { kBaseUrl } from "../../constants";
import { setCookies } from "../../utility";

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loginBtnDisable, setLoginBtnDisable] = useState(false);
  // const history = useHistory();

  const handleLogin = (event) => {
    event.preventDefault();
    setLoginBtnDisable(true);
    setError(false);

    if (
      email.match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) &&
      !password.length < 8
    ) {
      const user = JSON.stringify({ email: email, password: password });
      // const usr = JSON.stringify({
      //   email: "nikhilkoshty@gmail.com",
      //   password: "123456789",
      // });

      fetch(kBaseUrl + "login", {
        body: user,
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        method: "POST",
      })
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            let accessToken = "access-token";
            let token = res.headers.get(accessToken);
            setCookies(accessToken, token);
            props.setLogin();
          } else {
            if (res.status === 400) setError(true);
            else setError(true);
          }
        })
        .catch((e) => console.log("something went wrong"))
        .finally(() => {
          setLoginBtnDisable(false);
        });
    } else {
      setError(true);
      setLoginBtnDisable(false);
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ width: "90%" }}>
      <Grid container justify="center">
        <Typography color="error">
          {error && "Invalid Email or Password"}
        </Typography>
      </Grid>
      <TextField
        id="email"
        fullWidth
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
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <Grid container justify="center">
        <Button
          id="loginBtn"
          type="submit"
          color="primary"
          variant="contained"
          style={{ margin: "3%", width: "30%" }}
          disabled={loginBtnDisable}
        >
          Login
        </Button>
      </Grid>
    </form>
  );
};

export default LoginForm;
