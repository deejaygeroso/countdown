import React, { useEffect, useState } from "react";
import { getCountdownTimer, getRemainingTime } from "../lib";

const CountDown = (props) => {
  const { isActive, numberOfSecondsUsed, startDate } = props;
  const [minutes, setMinutes] = useState("0");
  const [seconds, setSeconds] = useState("00");

  const startCountDown = () => {
    const [tempMinutes, tempSeconds] = getCountdownTimer(
      startDate,
      numberOfSecondsUsed
    );
    setMinutes(tempMinutes);
    setSeconds(tempSeconds);
  };

  const showRemainingTime = () => {
    const [tempMinutes, tempSeconds] = getRemainingTime(numberOfSecondsUsed);
    setMinutes(tempMinutes);
    setSeconds(tempSeconds);
  };

  useEffect(() => {
    if (isActive) {
      const countDownInterval = setInterval(() => {
        startCountDown();
      }, 100);

      return () => {
        clearInterval(countDownInterval);
      };
    } else {
      showRemainingTime();
    }
  });

  if (!startDate) {
    <div className="countdown">0:00</div>;
  }

  return (
    <div className="countdown">
      {minutes}:{seconds}
    </div>
  );
};

export default CountDown;
