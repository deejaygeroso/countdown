// getCountdownTimer timer is coded to be limited to 3 minutes only.
const getCountdownTimer = (timeUsed = 0) => {
  const threeMinutes = 180000; // 180000ms or 3minutes
  const remainingTime = threeMinutes - timeUsed;

  if (remainingTime >= 0) {
    var options = { minute: "numeric", second: "numeric" };
    const newCountDownTimer = new Intl.DateTimeFormat("en-US", options).format(
      remainingTime
    );

    return newCountDownTimer.slice(1, 5); // removes the leading 0 in minutes. This will now look like 0:00 instead of 00:00
  }

  return "0:00";
};

export default getCountdownTimer;
