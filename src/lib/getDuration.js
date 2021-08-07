import moment from "moment";

const getDuration = (startDate, numberOfSecondsUsed = 0) => {
  var now = moment();
  var start = moment(startDate);
  var startTimeWithAdditionalTimeUsed = moment(start).subtract(
    numberOfSecondsUsed,
    "seconds"
  );

  var duration = moment.duration(now.diff(startTimeWithAdditionalTimeUsed));

  return duration;
};

export default getDuration;
