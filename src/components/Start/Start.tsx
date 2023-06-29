import "./Start.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function Start() {
  const [isHovered, setIsHovered] = useState(false);
  const [animationPlayed, setAnimationPlayed] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const handleAnimationEnd = () => {
    setAnimationPlayed(true);
  };

  return (
    <div className="intro-screen">
      <img
        src={"/assets/logo.svg"}
        alt="logo"
        className="logo animate__animated animate__slideInDown"
      />
      <Link to="play" className="start-button">
        <Button
          className={`animate__animated ${isHovered ? "animate__bounce" : ""} ${
            animationPlayed ? "" : "animate__slideInUp"
          }`}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onAnimationEnd={handleAnimationEnd}
        >
          START
        </Button>
      </Link>
    </div>
  );
}

export default Start;
