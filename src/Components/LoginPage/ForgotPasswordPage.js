import React from "react";
import { Card, Grid, CardContent, makeStyles } from "@material-ui/core";
import ForgotPasswordForm from "./ForgotPasswordForm";
import { Link } from "react-router-dom";

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

const ForgotPasswordPage = (props) => {
  const classes = useStyles();

  // const handleForgotPassword = () => {};
  // let history = useHistory();
  return (
    <div className="login-page">
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
              <Link to="/login" style={{ textDecoration: "none" }}>
                <h1 className={classes.title}>Lightbox</h1>
              </Link>
            </Grid>
            <Grid container justify="center">
              <ForgotPasswordForm setLogin={props.setLogin} />
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default ForgotPasswordPage;
