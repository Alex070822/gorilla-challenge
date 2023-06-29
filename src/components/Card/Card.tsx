import { FC } from "react";
import "./Card.css";
import { CardImage } from "../index";

interface CardProps {
  card: CardImage;
  handleChoice: (card: CardImage) => undefined;
  flipped: boolean;
}

const Card: FC<CardProps> = ({ card, handleChoice, flipped }) => {
  const handleClick = () => {
    handleChoice(card);
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />
        <div className="back" onClick={handleClick}>
          ?
        </div>
      </div>
    </div>
  );
};

export default Card;
