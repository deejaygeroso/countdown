import { useContext, useEffect, useState } from "react";

import AppContext from "../AppContext";
import config from "../config.json";
import { dbDocumentListen, dbDocumentSet } from "../lib/firestore";
import CountDown from "./CountDown";

const Timer = () => {
  const context = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [timeUsed, setTimeUsed] = useState(0);

  const timerStartStop = async () => {
    const documentToBeUpdated = { isActive: !isActive };
    if (!isActive) {
      // continue
      documentToBeUpdated["startTime"] = Date.now();
    } else {
      // pause
      documentToBeUpdated["timeUsed"] = Date.now() - startTime + timeUsed;
    }
    dbDocumentSet(context, config.timer.docId, documentToBeUpdated);
  };

  const timerReset = async () => {
    dbDocumentSet(context, config.timer.docId, {
      isActive: false,
      timeUsed: 0,
      startTime: Date.now(),
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
        setTimeUsed(data.timeUsed);

        if (data.startTime) {
          setStartTime(data.startTime);
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
          timeUsed={timeUsed}
          startTime={startTime}
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
