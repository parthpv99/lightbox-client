import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Button, Icon } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  disabledButton: {
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&:disabled": {
      backgroundColor: theme.palette.secondary.main,
      border: "1.5px solid #006BA6",
      color: "rgba(95, 95, 95, 1.0)",
      fontSize: "1.1rem",
    },
    [theme.breakpoints.down("sm")]: {
      "&:disabled": {
        fontSize: "0.75rem",
      },
    },
  },
}));

const DisabledLandingButton = (props) => {
  const classes = useStyles();
  return (
    <Button
      fullWidth
      color="inherit"
      variant="outlined"
      disabled
      className={classes.disabledButton}
    >
      <Grid
        container
        justify={props.align === "left" ? "space-between" : "flex-end"}
      >
        {props.text}
        {props.align === "left" && <Icon color="primary">arrow_right_alt</Icon>}
      </Grid>
    </Button>
  );
};

export default DisabledLandingButton;
