import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// import theme from "../../theme";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    color: theme.palette.primary.main,
    flexGrow: 1,
  },
  navbar: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    boxShadow: theme.shadows[0],
  },
  btnspace: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}));

const LandingHeader = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Lightbox
          </Typography>

          <Button color="inherit" className={classes.btnspace}>
            Join now
          </Button>
          <Button color="inherit" variant="outlined">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default LandingHeader;
