import React from "react";
import { Grid, Button, Icon, makeStyles, fade } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  disabledButton: {
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&:disabled": {
      backgroundColor:
        localStorage.getItem("dark-theme") === "true"
          ? fade(theme.palette.secondary.main, 0.8)
          : theme.palette.secondary.main,
      border: "1.5px solid #006BA6",
      color:
        localStorage.getItem("dark-theme") === "true"
          ? theme.palette.background.default
          : "rgba(95, 95, 95, 1.0)",
      fontSize: "1.1rem",
    },
    [theme.breakpoints.down("sm")]: {
      "&:disabled": {
        fontSize: "0.75rem",
      },
    },
  },
  darkIcon: {
    color: theme.palette.background.default,
  },
  icon: {
    color: theme.palette.primary.main,
  },
}));

const DisabledLandingButton = ({ text, align }) => {
  const classes = useStyles();
  return (
    <Button
      fullWidth
      color="inherit"
      variant="outlined"
      disabled
      className={classes.disabledButton}
    >
      <Grid container justify={align === "left" ? "space-between" : "flex-end"}>
        {text}
        {/* {align === "left" && (
          <Icon
            className={
              localStorage.getItem("dark-theme") === "true"
                ? classes.darkIcon
                : classes.icon
            }
          >
            arrow_right_alt
          </Icon>
        )} */}
      </Grid>
    </Button>
  );
};

export default DisabledLandingButton;
