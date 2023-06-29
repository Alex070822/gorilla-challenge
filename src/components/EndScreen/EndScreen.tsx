import "./EndScreen.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function EndScreen({ allMatched }) {
  return (
    <div className="end-screen-container">
      <div>{allMatched ? "you did it" : "oops you didn’t find them all"}</div>
      <Button>PLAY AGAIN</Button>
    </div>
  );
}

export default EndScreen;
