import React from "react";
import HomeBackground from "./pics/home-banner-background.png";
import HomeImage from "./pics/home-banner-image.png";
import Navbar from "./Nav";
import { FiArrowRight } from "react-icons/fi";
import useMediaQuery from '@mui/material/useMediaQuery';

const Home = () => {
  const isLargeScreen = useMediaQuery('(min-width:1050px)'); 

  return (
    <div className="home-section">
      <Navbar />
      <div className="home">
        <div className="home-img1">
          <img src={HomeBackground} alt="" />
        </div>
        <div className="home-text">
          <h1 className="heading">
            Your Favourite Food Delivered Hot & Fresh
          </h1>
          <p className="text">
          Unlock a world of flavor: Your cherished dishes, delivered in a symphony of freshness.
          </p>
          <button className="button2">
            Order Now <FiArrowRight />{" "}
          </button>
        </div>
        {isLargeScreen && (
        <div className="home-img2">
          <img src={HomeImage} alt="" />
        </div>)}
      </div>
    </div>
  );
};

export default Home;