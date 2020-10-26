import React, { useState } from "react";
import { Typography, TextField, Grid, Button } from "@material-ui/core";
// import { useHistory } from "react-router-dom";
// import { kBaseUrl } from "../../constants";
// import { setCookies } from "../../utility";

const ForgotPasswordForm = (props) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [loginBtnDisable, setLoginBtnDisable] = useState(false);
  // const history = useHistory();

  const handleForgotPassword = (event) => {
    event.preventDefault();
    setLoginBtnDisable(true);
    setError(false);
  };

  return (
    <form onSubmit={handleForgotPassword} style={{ width: "90%" }}>
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
      <Grid container justify="center">
        <Button size="small" color="primary">
          Enter your Email to Change Password
        </Button>
      </Grid>

      <Grid container justify="center">
        <Button
          id="loginBtn"
          type="submit"
          color="primary"
          variant="contained"
          style={{ margin: "3%" }}
          disabled={loginBtnDisable}
        >
          Request Password Change
        </Button>
      </Grid>
    </form>
  );
};

export default ForgotPasswordForm;
