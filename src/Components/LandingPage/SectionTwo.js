import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Container, Grid, Typography } from "@material-ui/core";
import group from "../../assets/section-2.jpg";
import Avatar from "@material-ui/core/Avatar";
import DisabledLandingButton from "./DisabledLandingButton";

const useStyles = makeStyles((theme) => ({
  root: {
    // marginBottom: "3rem",
    backgroundColor: "#FFFFFF",
  },
  heading: {
    color: theme.palette.primary.main,
    marginBottom: "2rem",
    fontSize: "2.4rem",
    textAlign: "right",
  },
  avatar: {
    width: "80%",
    height: "80%",
    backgroundColor: "transparent",
  },
}));

const SectionTwo = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container>
        <Grid container spacing={10} alignItems="center">
          <Grid item xs={12} sm={6}>
            {/* <img src={group} alt="Group Image" /> */}
            <Avatar className={classes.avatar} src={group} alt="Group Image" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" className={classes.heading}>
              Join Us!
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
                  text="Work With Any Team You Want"
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
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default SectionTwo;
