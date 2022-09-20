import React, { useEffect } from "react";
import { Grid, Typography, useMediaQuery } from "@material-ui/core";
// import LandingHeader from "./LandingHeader";
import Footer from "./Footer";
import CareerTab from "./CareerTab";
import CareerTabHorizontal from "./CareerTabHorizontal";

function Careers() {
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Grid>
        <Typography
          variant={matches ? "h2" : "h4"}
          color="primary"
          style={{ fontWeight: "bold", textAlign: "center", marginBottom: 25 }}
        >
          Careers At Lightbox
        </Typography>
      </Grid>
      <Grid>{matches ? <CareerTab /> : <CareerTabHorizontal />}</Grid>
      {/* </Grid> */}
      {/* <Grid>
        <Typography
          variant="h3"
          color="primary"
          style={{
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 25,
            marginTop: 25,
          }}
        >
          No Openings for Now !
        </Typography>
        <Typography
          variant="h4"
          color="primary"
          style={{
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 25,
            marginTop: 25,
          }}
        >
          Stay Tuned !
        </Typography>
      </Grid> */}
      <Footer />
    </div>
  );
}

export default Careers;
