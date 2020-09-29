import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, useMediaQuery, Container } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    fontWeight: "bold",
    fontSize: "1.3rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem",
    },
  },
  links:{
    fontSize: "1rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.7rem",
    },
  },
}));

const Footer = () => {
  const classes = useStyle();
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  return (
    <div className={classes.footer}>
      <Container>
        <Grid container spacing={matches ? 1 : 2}>
          <Grid item sm={6}>
            <p>&#169; Lightbox, Copyright 2020</p>
          </Grid>
          <Grid item sm={6}>
            <Grid container spacing={1} justify="space-evenly">
              <Grid item sm={3}>
                <p>About Us</p>
                <div className={classes.links}>
                  <p> Our Services </p>
                  <p> Testimonials </p>
                  <p> Contact Us </p>
                  <p> Careers </p> 
                  <p> Team LightBox </p> 
                </div>
              </Grid>
              <Grid item sm={3}>
                <p> Useful Links </p>
                <div className={classes.links}>
                  <p> Projects </p>
                  <p> Groups </p> 
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Footer;
