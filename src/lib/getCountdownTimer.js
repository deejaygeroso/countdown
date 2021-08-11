// getCountdownTimer timer is coded to be limited to 3 minutes only.
// this also assumes/expects that startTime would always be less or equal to Date.now().
const getCountdownTimer = (startTime, timeUsed = 0) => {
  const totalTimeUsed = Date.now() - startTime + timeUsed;
  const threeMinutes = 180000;
  const remainingTime = threeMinutes - totalTimeUsed;

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
