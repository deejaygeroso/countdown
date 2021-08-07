import { useContext, useEffect, useState } from "react";

import AppContext from "../AppContext";
import config from "../config.json";
import { dbDocumentListen, dbDocumentSet } from "../lib/firestore";
import { getDuration } from "../lib";
import CountDown from "./CountDown";

const Timer = () => {
  const context = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [numberOfSecondsUsed, setNumberOfSecondsUsed] = useState(0);

  const getTotalDurationInSeconds = () => {
    if (!startDate) {
      return 0;
    }

    // Added 1 second to synchronize automatic countdown which was added to the method startCountDown on CountDown component.
    return (
      Math.trunc(getDuration(startDate, numberOfSecondsUsed).asSeconds()) + 1
    );
  };

  const timerStartStop = async () => {
    const totalDurationInSeconds = getTotalDurationInSeconds(startDate);

    const documentToBeUpdated = { isActive: !isActive };
    if (!isActive) {
      documentToBeUpdated["startTime"] = new Date();
    } else {
      documentToBeUpdated["numberOfSecondsUsed"] = totalDurationInSeconds;
    }

    dbDocumentSet(context, config.timer.docId, documentToBeUpdated);
  };

  const timerReset = async () => {
    dbDocumentSet(context, config.timer.docId, {
      isActive: false,
      numberOfSecondsUsed: 0,
      startTime: new Date(),
    });
  };

  useEffect(() => {
    // Trigger callback whenever timer data changes
    const unsubscribe = dbDocumentListen(
      context,
      config.timer.docId,
      (data) => {
        setIsActive(data.isActive);
        setIsLoading(false);
        setNumberOfSecondsUsed(data.numberOfSecondsUsed);

        if (data.startTime) {
          setStartDate(data.startTime.toDate());
        }
      }
    );

    return () => {
      // Unsubscribe to listener on cleanup
      unsubscribe();
    };
  }, [context]);

  if (isLoading) {
    return <div className="timer-container">Loading...</div>;
  }

  return (
    <div className="timer-container">
      <div style={{ fontSize: "0.8em", paddingBottom: "15px" }}>
        <div>This is timer {config.timer.docId}</div>
        <div>The timer is {isActive ? "active" : "inactive"}</div>
      </div>

      <div className="timer">
        <CountDown
          isActive={isActive}
          numberOfSecondsUsed={numberOfSecondsUsed}
          startDate={startDate}
        />

        <div style={{ textAlign: "center", paddingTop: "1em" }}>
          <button className="button" onClick={timerStartStop}>
            {!isActive ? "Start" : "Stop"}
          </button>
          <button className="button" onClick={timerReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
