import "./SoundBtn.css";

const SoundBtn = ({ isSoundOn, handleSoundToggle }) => {
  return (
    <div
      className={`sound-btn ${isSoundOn ? "sound-btn-on" : "sound-btn-off"}`}
      onClick={handleSoundToggle}
    />
  );
};

export default SoundBtn;
