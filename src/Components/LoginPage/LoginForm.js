import React, { useState } from "react";
import { TextField, Button, Grid } from "@material-ui/core";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginHandler = (e) => {
    e.preventDefault();
    console.log(email, ":", password);
    setEmail("");
    setPassword("");
  };

  return (
    <form onClick={loginHandler} style={{ width: "90%" }}>
      <TextField
        fullWidth
        label="Email id"
        variant="outlined"
        style={{ margin: "2% auto" }}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
        required
      />
      <TextField
        fullWidth
        label="password"
        variant="outlined"
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
        style={{ margin: "2% auto" }}
        required
      />

      <Grid container justify="center">
        <Button
          color="primary"
          variant="contained"
          style={{ margin: "3%", width: "30%" }}
        >
          Login
        </Button>
      </Grid>
    </form>
  );
};

export default LoginForm;
