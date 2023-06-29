import { FC, useState } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";

import "./EndScreen.css";

interface EndScreenProps {
  allMatched: boolean;
  resetGame: () => undefined;
}

const EndScreen: FC<EndScreenProps> = ({ allMatched, resetGame }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  return (
    <div className="end-screen-container">
      <div className="end-message">
        {allMatched ? "You did it!" : "Oops, you didn't find them all."}
      </div>
      <Button
        onClick={resetGame}
        className={`animate__animated ${isHovered ? "animate__bounce" : ""}`}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        PLAY AGAIN
      </Button>
    </div>
  );
};

export default EndScreen;
