const getRemainingTime = (timeUsed = 0) => {
  const threeMinutes = 180000;
  const remainingTime = threeMinutes - timeUsed;

  var options = { minute: "numeric", second: "numeric" };
  const newCountDownTimer = new Intl.DateTimeFormat("en-US", options).format(
    remainingTime
  );

  return newCountDownTimer;
};

export default getRemainingTime;
