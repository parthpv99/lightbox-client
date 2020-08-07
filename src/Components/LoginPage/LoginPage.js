import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Grid, CardContent, Button } from "@material-ui/core";
import LoginForm from "./LoginForm";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    color: theme.palette.primary.main,
    flexGrow: 1,
    fontSize: "2rem",
    fontWeight: "bold",
  },
}));
const LoginPage = () => {
  const classes = useStyles();
  return (
    <div className="login-page">
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Card style={{ width: "40%" }}>
          <CardContent>
            <Grid item>
              <h1 className={classes.title}>Lightbox</h1>
            </Grid>
            <Grid container justify="center">
              <LoginForm />
            </Grid>
            <Grid container justify="center">
              <Button color="primary">Forgot Password?</Button>
            </Grid>
            <Grid container justify="center">
              <p>New to lightbox?</p>
              <Button color="primary" size="small">
                join now
              </Button>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default LoginPage;
