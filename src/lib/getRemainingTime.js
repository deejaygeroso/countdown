import showSecondsInString from "./showSecondsInString";

const getRemainingTime = (numberOfSecondsUsed = 0) => {
  const remainingSeconds = 180 - numberOfSecondsUsed;

  if (remainingSeconds <= 0) {
    return ["0", "00"];
  }

  var mins = Math.floor((remainingSeconds % 3600) / 60);
  var secs = Math.floor(remainingSeconds % 60);

  return [mins.toString(), showSecondsInString(secs)];
};

export default getRemainingTime;
