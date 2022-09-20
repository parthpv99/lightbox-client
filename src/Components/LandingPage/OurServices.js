import { Grid, Typography, useMediaQuery } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
// import LandingHeader from "./LandingHeader";
import Footer from "./Footer";
import OurServicesCard from "./OurServicesCard";
import scrum from "../../assets/projectcollaboration.png";
import scrumdark from "../../assets/projectcollaborationdark.png";
import study from "../../assets/learners.png";
import studydark from "../../assets/learnersdark.png";
import team from "../../assets/teambuilding.png";
import teamdark from "../../assets/teambuildingdark.png";
import { ThemeContext } from "../../Context/ThemeContext";

function OurServices() {
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const { defaultTheme } = useContext(ThemeContext);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {/* <LandingHeader /> */}
      <Grid>
        <Typography
          variant={matches ? "h2" : "h4"}
          color="primary"
          style={{
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 15,
            marginTop: 10,
          }}
        >
          Lightbox Services
        </Typography>
        {/* <Divider
          style={{
            width: "40%",
            backgroundColor: "grey",
            margin: "auto",
          }}
        /> */}
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid
            item
            xs={12}
            md={4}
            container
            justify="center"
            alignItems="center"
          >
            <OurServicesCard title="Project Collaboration" photo={defaultTheme === "dark" ? scrumdark : scrum} />
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
              photo={defaultTheme === "dark" ? teamdark : team}
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
            <OurServicesCard title="Join a Group of Learners" photo={defaultTheme === "dark" ? studydark : study} />
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default OurServices;
