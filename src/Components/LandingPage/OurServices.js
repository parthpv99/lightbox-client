import { Grid, Typography } from "@material-ui/core";
import React from "react";
import LandingHeader from "./LandingHeader";
import Footer from "./Footer";
import OurServicesCard from "./OurServicesCard";
import study from "../../assets/study.svg";
import team from "../../assets/team.svg";
import scrum from "../../assets/scrum.svg";

function OurServices() {
  return (
    <div>
      <LandingHeader />
      <Grid>
        <Typography
          variant="h2"
          color="primary"
          style={{ fontWeight: "bold", textAlign: "center", marginBottom: 25 }}
        >
          Our Services
        </Typography>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid
            item
            xs={12}
            md={4}
            container
            justify="center"
            alignItems="center"
          >
            <OurServicesCard title="Project Collaboration" photo={scrum} />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            container
            justify="center"
            alignItems="center"
          >
            <OurServicesCard
              title="Inter-disciplinary Team Building"
              photo={team}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            container
            justify="center"
            alignItems="center"
          >
            <OurServicesCard title="Join a Group of Learners" photo={study} />
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default OurServices;
