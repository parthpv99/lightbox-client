import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { Container, useMediaQuery } from "@material-ui/core";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    color: theme.palette.primary.main,
    flexGrow: 1,
    fontSize: "3rem",
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: { fontSize: "2rem" },
  },
  navbar: {
    marginTop: "2.5rem",
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    boxShadow: theme.shadows[0],
  },
  btnspace: {
    marginLeft: theme.spacing(2),
    fontSize: "1.2rem",
    marginRight: theme.spacing(2),
    "&:hover": {
      backgroundColor: fade(theme.palette.primary.main, 0.1),
      color: theme.palette.primary.main,
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(1),
      fontSize: "0.8rem",
      marginRight: theme.spacing(0),
    },
  },
  logo: {
    width: "6%",
    height: "6%",
  },
}));

const LandingHeader = (props) => {
  const classes = useStyles();
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  const toolbar = (
    <Toolbar>
      {/* <img src={logo} alt="logo" className={classes.logo} /> */}
      <Typography variant="h4" className={classes.title}>
        Lightbox
      </Typography>

      <Button
        color="inherit"
        className={classes.btnspace}
        onClick={() => {
          props.history.push("/register");
        }}
      >
        Join now
      </Button>
      <Button
        color="inherit"
        variant="outlined"
        className={classes.btnspace}
        onClick={() => {
          props.history.push("/login");
        }}
      >
        Login
      </Button>
    </Toolbar>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.navbar}>
        {matches ? <Container>{toolbar}</Container> : toolbar}
      </AppBar>
    </div>
  );
};

export default withRouter(LandingHeader);
