import React, { useContext } from "react";
import {
  Container,
  Grid,
  Typography,
  Avatar,
  makeStyles,
} from "@material-ui/core";
import group from "../../assets/section-1.jpg";
import darkgroup from "../../assets/section-1-dark.jpg";
import DisabledLandingButton from "./DisabledLandingButton";
import { ThemeContext } from "../../Context/ThemeContext";

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
    margin: "0 auto",
  },
}));

const SectionOne = () => {
  const classes = useStyles();
  const { defaultTheme } = useContext(ThemeContext);

  return (
    <div className={classes.root}>
      <Container>
        <Grid container alignItems="center">
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" className={classes.heading}>
              Are you ready to kick start your professional journey in College?
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
                  text="Join Group of Learners"
                  align="left"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Avatar
              className={classes.avatar}
              src={defaultTheme === "dark" ? darkgroup : group}
              alt="Group Image"
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default SectionOne;
