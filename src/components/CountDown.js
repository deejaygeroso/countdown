import React, { useEffect, useState } from "react";
import { getCountdownTimer } from "../lib";

const CountDown = (props) => {
  const { startDate } = props;
  const [minutes, setMinutes] = useState("0");
  const [seconds, setSeconds] = useState("00");

  const startCountDown = () => {
    const [tempMinutes, tempSeconds] = getCountdownTimer(startDate);
    setMinutes(tempMinutes);
    setSeconds(tempSeconds);
  };

  useEffect(() => {
    const countDownInterval = setInterval(() => {
      startCountDown();
    }, 100);

    return () => {
      clearInterval(countDownInterval);
    };
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
