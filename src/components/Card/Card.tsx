import "./Card.css";

function Card({ card, handleChoice, flipped }) {
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
}

export default Card;
