const getRemainingTime = (timeUsed = 0) => {
  const threeMinutes = 180000;
  const remainingTime = threeMinutes - timeUsed;

  if (remainingTime >= 0) {
    var options = { minute: "numeric", second: "numeric" };
    const newCountDownTimer = new Intl.DateTimeFormat("en-US", options).format(
      remainingTime
    );

    return newCountDownTimer;
  }

  return "00:00";
};

export default getRemainingTime;
