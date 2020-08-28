import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, useMediaQuery } from "@material-ui/core";
import { Container } from "@material-ui/core";

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
              </Grid>
              <Grid item sm={3}>
                <p>Contact Us</p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Footer;
