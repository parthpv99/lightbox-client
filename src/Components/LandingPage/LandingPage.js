import React from "react";
import LandingHeader from "./LandingHeader";
import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import Footer from "./Footer";

const LandingPage = () => {
  return (
    <div className="landingPage">
      <LandingHeader />
      <SectionOne />
      <SectionTwo />
      <Footer />
    </div>
  );
};

export default LandingPage;