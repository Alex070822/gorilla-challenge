import { FC } from "react";
import "./SoundBtn.css";

interface SoundBtnProps {
  isSoundOn: boolean;
  handleSoundToggle: () => undefined;
}

const SoundBtn: FC<SoundBtnProps> = ({ isSoundOn, handleSoundToggle }) => {
  return (
    <div
      className={`sound-btn ${isSoundOn ? "sound-btn-on" : "sound-btn-off"}`}
      onClick={handleSoundToggle}
    />
  );
};

export default SoundBtn;
