import { FC, useEffect, useState } from "react";
import "./Timer.css";

const tickingAudio = new Audio("/assets/ticking.mp3");

interface TimerProps {
  isSoundOn: boolean;
  handleGameEnd: () => void;
}

const Timer: FC<TimerProps> = ({ isSoundOn, handleGameEnd }) => {
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      if (isSoundOn && timer <= 10) {
        tickingAudio.currentTime = 0;
        tickingAudio.loop = true;
        tickingAudio.play();
      } else {
        tickingAudio.pause();
        tickingAudio.currentTime = 0;
      }

      return () => {
        clearInterval(countdown);
        tickingAudio.pause();
        tickingAudio.currentTime = 0;
      };
    } else {
      handleGameEnd();
    }
  }, [timer, isSoundOn, handleGameEnd]);

  const timerClassName = timer <= 10 ? "red-timer" : "";

  return (
    <div className="timer-container">
      <div className="timer-title">Time</div>
      <div className={timerClassName}>{timer}</div>
    </div>
  );
};

export default Timer;
