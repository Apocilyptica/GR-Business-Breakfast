import React from "react";

// Material-ui

// components
import Slider from "../../components/Slider";
import VisionStatement from "../../components/VisionStatement";
import HomeMembership from "../../components/HomeMembership";

// Data
import { HomeSliderData } from "../../utils/homeSlider";
import { ButtonStyles } from "../../utils/buttonStyles";

const HomePage = () => {
  return (
    <div>
      <Slider data={HomeSliderData} />
      <VisionStatement />
      <HomeMembership styles={ButtonStyles} />
    </div>
  );
};

export default HomePage;
