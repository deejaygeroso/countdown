// getCountdownTimer timer is coded to be limited to 3 minutes only.
// this also assumes/expects that startTime would always be less or equal to Date.now().
const getCountdownTimer = (startTime, numberOfSecondsUsed = 0) => {
  const timeUsed = Date.now() - startTime;
  const threeMinutes = 180000;
  const remainingTime = threeMinutes - timeUsed;

  if (remainingTime >= 0) {
    var options = { minute: "numeric", second: "numeric" };
    const newCountDownTimer = new Intl.DateTimeFormat("en-US", options).format(
      remainingTime
    );

    return newCountDownTimer;
  }

  return "0:00";
};

export default getCountdownTimer;
