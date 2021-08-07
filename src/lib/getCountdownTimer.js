import getDuration from "./getDuration";
import showSecondsInString from "./showSecondsInString";

// getCountdownTimer timer is coded to be limited to 3 minutes only.
// this also assumes/expects that date would always be less or equal to current date.
const getCountdownTimer = (startDate, numberOfSecondsUsed = 0) => {
  const duration = getDuration(startDate, numberOfSecondsUsed);

  let minutes = 0;
  let seconds = "0";

  const tempMinutes = 3 - duration.minutes();
  const tempSeconds = 60 - duration.seconds();

  if (duration.asSeconds() >= 180) {
    return ["0", "00"];
  }

  if (tempSeconds === 60) {
    minutes = tempMinutes;
    seconds = showSecondsInString(0);
  } else if (tempSeconds < 60) {
    minutes = tempMinutes - 1;
    seconds = showSecondsInString(tempSeconds);
  } else {
    minutes = tempMinutes;
    seconds = showSecondsInString(tempSeconds);
  }

  return [minutes.toString(), seconds];
};

export default getCountdownTimer;
