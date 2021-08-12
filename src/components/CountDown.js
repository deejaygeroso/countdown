import React, { useEffect, useState } from "react";
import { getCountdownTimer } from "../lib";

const CountDown = (props) => {
  const { isActive, timeUsed, startTime } = props;
  const [countDownTimer, setCountDownTimer] = useState("0:00");

  useEffect(() => {
    // Timer will countdown.
    if (isActive) {
      const countDownInterval = setInterval(() => {
        const totalTimeUsed = Date.now() - startTime + timeUsed;
        const newCountDownTimer = getCountdownTimer(totalTimeUsed);
        setCountDownTimer(newCountDownTimer);
      }, 100); // 100ms allows timer to look synchronized when viewed within two windows/browsers side by side.

      return () => {
        clearInterval(countDownInterval);
      };
    }
  }, [isActive, startTime, timeUsed]);

  useEffect(() => {
    // When paused, show remaining time.
    if (!isActive) {
      const newCountDownTimer = getCountdownTimer(timeUsed);
      setCountDownTimer(newCountDownTimer);
    }
  }, [isActive, timeUsed]);

  if (startTime === null) {
    <div className="countdown">0:00</div>;
  }

  return <div className="countdown">{countDownTimer}</div>;
};

export default CountDown;
