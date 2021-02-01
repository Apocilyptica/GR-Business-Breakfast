import React from "react";

// Material-ui

// components
import Slider from "../../components/Slider";
import VisionStatement from "../../components/VisionStatement";

// Data
import { HomeSliderData } from "../../utils/homeSlider";

const HomePage = () => {
  return (
    <div>
      <Slider data={HomeSliderData} />
      <VisionStatement />
    </div>
  );
};

export default HomePage;
