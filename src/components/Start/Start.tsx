import "./Start.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import { useState } from "react";

const cardImages = [
  { src: "/assets/comet.svg" },
  { src: "/assets/moon.svg" },
  { src: "/assets/star.svg" },
  { src: "/assets/sun.svg" },
];

function Start() {
  const [isHovered, setIsHovered] = useState(false);
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const handleAnimationEnd = () => {
    setAnimationPlayed(true);
  };

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setTurns(0);
  };

  console.log(cards, turns);

  return (
    <div className="intro-screen">
      <img
        src={"/assets/logo.svg"}
        alt="logo"
        className="logo animate__animated animate__slideInDown"
      />
      <Button
        className={`start-button animate__animated ${
          isHovered ? "animate__bounce" : ""
        } ${animationPlayed ? "" : "animate__slideInUp"}`}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onAnimationEnd={handleAnimationEnd}
        onClick={shuffleCards}
      >
        START
      </Button>
    </div>
  );
}

export default Start;
