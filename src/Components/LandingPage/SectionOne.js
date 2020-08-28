import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Container, Grid, Typography, useMediaQuery } from "@material-ui/core";
import group from "../../assets/section-1.jpg";
import Avatar from "@material-ui/core/Avatar";
import DisabledLandingButton from "./DisabledLandingButton";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "3rem",
  },
  heading: {
    color: theme.palette.primary.main,
    marginBottom: "2rem",
    fontSize: "2.4rem",
    [theme.breakpoints.down("md")]: {
      fontSize: "1.5rem",
      marginTop: 50,
    },
  },
  avatar: {
    width: "80%",
    height: "80%",
    backgroundColor: "transparent",
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto",
    },
  },
}));

const SectionOne = () => {
  const classes = useStyles();
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  return (
    <div className={classes.root}>
      <Container>
        <Grid container spacing={matches ? 10 : 5} alignItems="center">
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" className={classes.heading}>
              Are you ready to kick start your <br /> professional journey in
              college?{" "}
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <DisabledLandingButton text="Find Projects" align="left" />
              </Grid>
              <Grid item xs={12}>
                <DisabledLandingButton
                  text="Build Your Dream Team"
                  align="left"
                />
              </Grid>
              <Grid item xs={12}>
                <DisabledLandingButton
                  text="Join a Group of Learners"
                  align="left"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* <img src={group} alt="Group Image" /> */}
            <Avatar className={classes.avatar} src={group} alt="Group Image" />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default SectionOne;
