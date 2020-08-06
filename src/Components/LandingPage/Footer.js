import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import { Container } from "@material-ui/core";
const useStyle = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    fontWeight: "bold",
    fontSize: "1.3rem",
  },
}));

const Footer = () => {
  const classes = useStyle();
  return (
    <div className={classes.footer}>
      <Container>
        <Grid container spacing>
          <Grid item sm={6}>
            <p>Lightbox, Copyright 2020</p>
          </Grid>
          <Grid item sm={6}>
            <Grid container justify="space-evenly">
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
