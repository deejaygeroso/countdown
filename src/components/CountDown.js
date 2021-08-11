import React, { useEffect, useState } from "react";
import { getCountdownTimer, getRemainingTime } from "../lib";

const CountDown = (props) => {
  const { isActive, numberOfSecondsUsed, startDate } = props;
  const [minutes, setMinutes] = useState("0");
  const [seconds, setSeconds] = useState("00");

  const startCountDown = () => {
    if (startDate) {
      const [tempMinutes, tempSeconds] = getCountdownTimer(
        startDate,
        numberOfSecondsUsed + 1 // Adding 1 second to automatically start counting down.
      );
      setMinutes(tempMinutes);
      setSeconds(tempSeconds);
    }
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
    }
  }, [isActive, startDate, numberOfSecondsUsed]);

  useEffect(() => {
    if (!isActive) {
      showRemainingTime();
    }
  }, [isActive, numberOfSecondsUsed]);

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
