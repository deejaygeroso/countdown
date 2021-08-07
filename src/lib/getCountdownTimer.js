import moment from "moment";

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
  var now = moment();
  var start = moment(startDate);
  var duration = moment.duration(now.diff(start));

  var minutes = 0;
  var seconds = "0";

  var tempMinutes = 3 - duration.minutes();
  var tempSeconds = 60 - duration.seconds();

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
