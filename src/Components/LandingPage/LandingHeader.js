import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    color: theme.palette.primary.main,
    flexGrow: 1,
    fontSize: "3rem",
    fontWeight: "bold",
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
  },
  logo: {
    width: "6%",
    height: "6%",
  },
}));

const LandingHeader = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.navbar}>
        <Container>
          <Toolbar>
            {/* <img src={logo} alt="logo" className={classes.logo} /> */}
            <Typography variant="h4" className={classes.title}>
              Lightbox
            </Typography>

            <Button color="inherit" className={classes.btnspace}>
              Join now
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              className={classes.btnspace}
            >
              Login
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default LandingHeader;
