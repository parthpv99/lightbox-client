import React from "react";
import { Grid, Container, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  footer: {
    zIndex: -1,
    backgroundColor:
      localStorage.getItem("dark-theme") === "true"
        ? theme.palette.background.default
        : theme.palette.primary.main,
    color: theme.palette.secondary.main,
    fontSize: "1.3rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem",
    },
  },
  footerSmallPage: {
    backgroundColor:
      localStorage.getItem("dark-theme") === "true"
        ? theme.palette.background.default
        : theme.palette.primary.main,
    color: theme.palette.secondary.main,
    fontSize: "1.3rem",
    zIndex: -1,
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem",
      position: "relative",
    },
    position: "absolute",
    right: 0,
    bottom: 0,
    left: 0,
  },
  heading: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem",
    },
  },
  links: {
    fontSize: "1rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.7rem",
    },
  },
}));

const Footer = ({ smallPage }) => {
  const classes = useStyle();
  // const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const history = useHistory();
  return (
    <div className={smallPage ? classes.footerSmallPage : classes.footer}>
      <Container>
        <Grid container>
          <Grid item sm={6}>
            <p>&#169; Lightbox, Copyright 2020</p>
          </Grid>
          <Grid item sm={6}>
            <Grid container justify="space-evenly">
              <Grid item sm={3} style={{ marginLeft: 5, marginRight: 5 }}>
                <p className={classes.heading}>About Lightbox</p>
                <div className={classes.links}>
                  <p
                    onClick={() => {
                      history.push("/");
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {" "}
                    Home{" "}
                  </p>
                  <p
                    onClick={() => {
                      history.push("/services");
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {" "}
                    Services{" "}
                  </p>
                  <p
                    onClick={() => {
                      history.push("/careers");
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {" "}
                    Careers{" "}
                  </p>
                  <p
                    onClick={() => {
                      history.push("/developers");
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {" "}
                    Team LightBox{" "}
                  </p>
                  <p
                    onClick={() => {
                      history.push("/policy");
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {" "}
                    Privacy Policy{" "}
                  </p>
                </div>
              </Grid>
              <Grid item sm={3} style={{ marginLeft: 5, marginRight: 5 }}>
                <p className={classes.heading}> Useful Links</p>
                <div className={classes.links}>
                  <p
                    onClick={() => {
                      history.push("/register");
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {" "}
                    Register{" "}
                  </p>
                  <p
                    onClick={() => {
                      history.push("/login");
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {" "}
                    Sign-In
                  </p>
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
