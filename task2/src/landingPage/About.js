import React from "react";
import AboutBackground from "./pics/about-background.png";
import AboutImage from "./pics/about-background-image.png";
import useMediaQuery from '@mui/material/useMediaQuery';

const About = () => {

  const isLargeScreen = useMediaQuery('(min-width:1050px)'); 

  return (
    <div className="about-section">
      <div className="img1">
        <img src={AboutBackground}></img>
      </div>
      {isLargeScreen && (
      <div className="img2">
        <img src={AboutImage}></img>
      </div>
      )}
      <div className="content">
        <p className="smallheading">About</p>
        <h1 className="heading">
          Food Is An Important Part Of A Balanced Diet
        </h1>
        <p className="text">
        At our restaurant, we believe that good food isn't just a treat; it's a fundamental component of a well-balanced diet. 
        </p>
        <p className="text">
        Savor the goodness in every bite, as we serve you a menu designed to nourish both body and soul.
        </p>
        <div>
          <button className="button2">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default About;