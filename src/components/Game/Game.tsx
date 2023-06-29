import "./Game.css";
import { useEffect, useState } from "react";
import Card from "../Card/Card";
import Timer from "../Timer/Timer";
import { Modal, Button } from "react-bootstrap";
import EndScreen from "../EndScreen/EndScreen";
import SoundBtn from "../SoundBtn/SoundBtn";

const cardImages = [
  { src: "/assets/comet.svg", matched: false },
  { src: "/assets/moon.svg", matched: false },
  { src: "/assets/star.svg", matched: false },
  { src: "/assets/sun.svg", matched: false },
];

const bgAudio = new Audio("/assets/background.mp3");
const correctAudio = new Audio("/assets/correct.mp3");
const incorrectAudio = new Audio("/assets/incorrect.mp3");

function Game() {
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [gameEnded, setGameEnded] = useState(false);
  const [allMatched, setAllMatched] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      const delay = setTimeout(() => {
        if (choiceOne.src === choiceTwo.src) {
          setCards((prevCards) => {
            const updatedCards = prevCards.map((card) => {
              if (card.src === choiceOne.src) {
                return { ...card, matched: true };
              } else {
                return card;
              }
            });
            const isAllMatched = updatedCards.every((card) => card.matched);
            setAllMatched(isAllMatched);
            return updatedCards;
          });
          setModalMessage("Nice! It's a match");
          if (isSoundOn) {
            correctAudio.play();
          }
          resetTurn();
        } else {
          setModalMessage("Sorry, but this is not a match");
          if (isSoundOn) {
            incorrectAudio.play();
          }
          resetTurn();
        }
        setShowModal(true);
      }, 200);

      return () => clearTimeout(delay);
    }
  }, [choiceOne, choiceTwo, isSoundOn]);

  useEffect(() => {
    if (allMatched) {
      handleGameEnd();
    }
  }, [allMatched]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  useEffect(() => {
    bgAudio.loop = true;
    return () => {
      bgAudio.loop = false;
    };
  }, []);

  const handleSoundToggle = () => {
    setIsSoundOn(!isSoundOn);
    if (!isSoundOn) {
      bgAudio.currentTime = 0;
      bgAudio.play();
    } else {
      bgAudio.currentTime = 0;
      bgAudio.pause();
    }
  };

  const handleGameEnd = () => {
    setGameEnded(true);
  };

  useEffect(() => {
    if (gameEnded) {
      if (isSoundOn) {
        setIsSoundOn(false);
        bgAudio.currentTime = 0;
        bgAudio.pause();
      }
    }
  }, [gameEnded, isSoundOn]);

  return (
    <div className="game">
      {gameEnded ? (
        <EndScreen allMatched={allMatched} />
      ) : (
        <div>
          <div className="game-info">
            <Timer isSoundOn={isSoundOn} handleGameEnd={handleGameEnd} />
            <SoundBtn
              isSoundOn={isSoundOn}
              handleSoundToggle={handleSoundToggle}
            />
          </div>
          <div className="game-board">
            {cards.map((card) => (
              <Card
                key={card.id}
                card={card}
                handleChoice={handleChoice}
                flipped={
                  card === choiceOne || card === choiceTwo || card.matched
                }
              />
            ))}
          </div>
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Message</Modal.Title>
            </Modal.Header>
            <Modal.Body>{modalMessage}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default Game;
