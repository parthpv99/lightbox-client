import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Grid, CardContent, Button } from "@material-ui/core";
import RegisterForm from "./RegisterForm";
import { useHistory, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    color: theme.palette.primary.main,
    flexGrow: 1,
    fontSize: "2rem",
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      fontSie: "1.6rem",
      textAlign: "center",
    },
  },
  card: {
    width: "40%",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
}));

const RegisterPage = (props) => {
  const classes = useStyles();

  // const handleForgotPassword = () => {};
  let history = useHistory();
  return (
    <div className="register-page">
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Card className={classes.card}>
          <CardContent>
            <Grid item>
              <Link to="/" style={{textDecoration:"none"}}>
                <h1 className={classes.title}>Lightbox</h1>
              </Link>
            </Grid>
            <Grid container justify="center">
              <RegisterForm setLogin={props.setLogin} />
            </Grid>
            <Grid container justify="center">
              <p>Already on lightbox?</p>
              <Button
                color="primary"
                size="small"
                onClick={() => history.replace("/login")}
              >
                Login
              </Button>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default RegisterPage;
