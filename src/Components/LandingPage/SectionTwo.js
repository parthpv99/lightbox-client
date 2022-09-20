import React, { useContext } from "react";
import {
  Container,
  Grid,
  Typography,
  useMediaQuery,
  Avatar,
  makeStyles,
} from "@material-ui/core";
import group from "../../assets/section-2.jpg";
import darkgroup from "../../assets/section-2-dark.jpg";
import DisabledLandingButton from "./DisabledLandingButton";
import { ThemeContext } from "../../Context/ThemeContext";

const useStyles = makeStyles((theme) => ({
  root: {
    // marginBottom: "3rem",
    backgroundColor:
      localStorage.getItem("dark-theme") === "true" ? "#898989" : "#FFFFFF",
  },
  heading: {
    color:
      localStorage.getItem("dark-theme") === "true"
        ? theme.palette.background.default
        : theme.palette.primary.main,
    marginBottom: "2rem",
    fontSize: "2.4rem",
    textAlign: "right",
    [theme.breakpoints.down("md")]: {
      fontSize: "1.5rem",
      marginTop: "10px",
    },
  },
  avatar: {
    width: "80%",
    height: "80%",
    backgroundColor: "transparent",
    marginBottom: "5%",
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto",
    },
  },
}));

const SectionTwo = () => {
  const classes = useStyles();
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const { defaultTheme } = useContext(ThemeContext);

  const avatar = (
    <Grid item xs={12} sm={6}>
      <Avatar
        className={classes.avatar}
        src={defaultTheme === "dark" ? darkgroup : group}
        alt="Group Image"
      />
    </Grid>
  );

  return (
    <div className={classes.root}>
      <Container>
        <Grid container alignItems="center">
          {matches && avatar}
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" className={classes.heading}>
              Join Us !
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <DisabledLandingButton
                  text="Connect with People Who Can Help"
                  align="right"
                />
              </Grid>
              <Grid item xs={12}>
                <DisabledLandingButton
                  text="Work With the Team You Want"
                  align="right"
                />
              </Grid>
              <Grid item xs={12}>
                <DisabledLandingButton
                  text="Make Every Project a Success"
                  align="right"
                />
              </Grid>
              <Grid item xs={12}>
                <DisabledLandingButton
                  text="Join Your Juniors, Seniors ans Classmate"
                  align="right"
                />
              </Grid>
              {!matches && avatar}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default SectionTwo;
