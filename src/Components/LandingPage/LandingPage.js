import React, { useEffect } from "react";
import LandingHeader from "./LandingHeader";
import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import Footer from "./Footer";

const LandingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
