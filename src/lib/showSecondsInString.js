const showSecondsInString = (input) => {
  if (input === 60) {
    return "00";
  } else if (input > 9) {
    return input.toString();
  } else {
    return `0${input}`;
  }
};

export default showSecondsInString;
