import { useContext, useEffect, useState } from "react";

import AppContext from "../AppContext";
import config from "../config.json";
import { dbDocumentListen, dbDocumentSet } from "../lib/firestore";
import CountDown from "./CountDown";

const Timer = () => {
  const context = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [startDate, setStartDate] = useState(null);

  const timerStartStop = async () => {
    dbDocumentSet(context, config.timer.docId, {
      isActive: !isActive,
      // TODO: Add additional data fields to store here
    });
  };

  const timerReset = async () => {
    dbDocumentSet(context, config.timer.docId, {
      isActive: false,
      startTime: new Date(),
      // TODO: Add additional data fields to store here
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
        setStartDate(data.startTime.toDate());
        // TODO: Add additional code here to react to changes in data fields
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
        <CountDown startDate={startDate} />

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
