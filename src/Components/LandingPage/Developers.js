import React, { useEffect } from "react";
import {
  Box,
  Grid,
  makeStyles,
  Button,
  fade,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import LandingHeader from "./LandingHeader";
import Footer from "./Footer";
import DeveloperCard from "./DeveloperCard";
import parth from "../../assets/parth.jpg";
import dishang from "../../assets/dishang.jpg";
import nisarg from "../../assets/nisarg.jpg";
import jrd from "../../assets/jrd.jpg";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  btnspace: {
    marginLeft: theme.spacing(7),
    fontSize: "1.2rem",
    marginRight: theme.spacing(2),

    "&:hover": {
      backgroundColor: fade(theme.palette.primary.main, 0.1),
      color: theme.palette.primary.main,
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(1),
      fontSize: "0.8rem",
      marginRight: theme.spacing(0),
    },
  },
}));

function Developers() {
  const history = useHistory();
  const classes = useStyles();

  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Box mx={3}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={{ margin: "10px auto" }}
        >
          <Grid item>
            <Typography
              variant={matches ? "h2" : "h4"}
              color="primary"
              style={{
                fontWeight: "bold",
                textAlign: "center",
                // marginBottom: 25,
              }}
            >
              Team Lightbox
            </Typography>
          </Grid>
          <Grid item>
            <Button
              color="primary"
              variant="outlined"
              className={classes.btnspace}
              onClick={() => {
                history.push("/careers");
              }}
            >
              Join Us
            </Button>
          </Grid>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid
            item
            xs={12}
            md={3}
            container
            justify="center"
            alignItems="center"
          >
            <DeveloperCard
              name="Prof. Jashvant Dave"
              role="Mentor"
              mentor={true}
              photo={jrd}
              scholar="https://scholar.google.com/citations?user=SqmERZ8AAAAJ&hl=en"
              readmore="http://www.vgec.cteguj.in/facultydetail/show/36789"
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            container
            justify="center"
            alignItems="center"
          >
            <DeveloperCard
              name="Dishang Patel"
              role="Full-Stack Developer"
              photo={dishang}
              linkedin="https://www.linkedin.com/in/dishangpatel/"
              github="https://github.com/dishangPatel"
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            container
            justify="center"
            alignItems="center"
          >
            <DeveloperCard
              name="Parth Pansuriya"
              role="UI/UX Designer"
              photo={parth}
              linkedin="https://www.linkedin.com/in/parth-pansuriya/"
              github="https://github.com/parthpv99"
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            container
            justify="center"
            alignItems="center"
          >
            <DeveloperCard
              name="Nisarg Chokshi"
              role="JavaScript Developer"
              photo={nisarg}
              linkedin="https://www.linkedin.com/in/nisarg-chokshi1/"
              github="https://github.com/NisargChokshi"
            />
          </Grid>
        </Grid>
      </Box>
      <Footer smallPage={true} />
    </div>
  );
}

export default Developers;
