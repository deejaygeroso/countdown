import getDuration from "./getDuration";

const showSecondsInString = (input) => {
  if (input === 60) {
    return "00";
  } else if (input > 9) {
    return input.toString();
  } else {
    return `0${input}`;
  }
};

const getCountdownTimer = (startDate) => {
  const duration = getDuration(startDate);

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
