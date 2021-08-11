import React, { useEffect, useState } from "react";

const CountDown = (props) => {
  const { isActive, numberOfSecondsUsed, startTime } = props;
  const [countDownTimer, setCountDownTimer] = useState("0:00");

  useEffect(() => {
    // if (isActive) {
    const countDownInterval = setInterval(() => {
      const newCountDownTimer = getCountdownTimer(startTime);
      setCountDownTimer(newCountDownTimer);
    }, 100); // 100ms allows timer to look synchronized when viewed within two windows/browsers side by side.

    return () => {
      clearInterval(countDownInterval);
    };
    // }
  }, [isActive, startTime, numberOfSecondsUsed]);

  // useEffect(() => {
  //   if (!isActive) {
  //     showRemainingTime()  //   }
  // }, [isActive, numberOfSecondsUsed]);

  if (!startTime) {
    <div className="countdown">0:00</div>;
  }

  return <div className="countdown">{countDownTimer}</div>;
};

export default CountDown;
