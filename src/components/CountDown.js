import React, { useEffect, useState } from "react";

const CountDown = (props) => {
  const { isActive, numberOfSecondsUsed, startTime } = props;
  const [countDownTimer, setCountDownTimer] = useState("0:00");

  const startCountDown = () => {
    const timeUsed = Date.now() - startTime;
    const threeMinutes = 180000;
    const remainingTime = threeMinutes - timeUsed;

    var options = { minute: "numeric", second: "numeric" };
    const newCountDownTimer = new Intl.DateTimeFormat("en-US", options).format(
      remainingTime
    );

    setCountDownTimer(newCountDownTimer);
  };

  // const showRemainingTime = () => {
  //   const [tempMinutes, tempSeconds] = getRemainingTime(numberOfSecondsUsed);
  //   setMinutes(tempMinutes);
  //   setSeconds(tempSeconds);
  //   1628659837877 - 1628659838878;
  // };

  useEffect(() => {
    // if (isActive) {
    const countDownInterval = setInterval(() => {
      startCountDown();
    }, 100); // 100ms allows timer to look synchronized when viewed within two windows/browsers side by side.

    return () => {
      clearInterval(countDownInterval);
    };
    // }
  }, [isActive, startTime, numberOfSecondsUsed]);

  // useEffect(() => {
  //   if (!isActive) {
  //     showRemainingTime();
  //   }
  // }, [isActive, numberOfSecondsUsed]);

  if (!startTime) {
    <div className="countdown">0:00</div>;
  }

  return <div className="countdown">{countDownTimer}</div>;
};

export default CountDown;
