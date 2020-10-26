import React from "react";
import { Grid, Typography } from "@material-ui/core";
import LandingHeader from "./LandingHeader";
import Footer from "./Footer";
import DeveloperCard from "./DeveloperCard";
import parth from "../../assets/parth.jpg";
import dishang from "../../assets/dishang.jpg";
import nisarg from "../../assets/nisarg.jpg";
import jrd from "../../assets/jrd.jpg";

function Developers() {
  return (
    <div>
      <Typography
        variant="h2"
        color="primary"
        style={{ fontWeight: "bold", textAlign: "center", marginBottom: 25 }}
      >
        Team Lightbox
      </Typography>
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
            role="Front End Developer"
            photo={nisarg}
            linkedin="https://www.linkedin.com/in/nisarg-chokshi1/"
            github="https://github.com/NisargChokshi"
          />
        </Grid>
      </Grid>
      <Footer smallPage={true} />
    </div>
  );
}

export default Developers;
