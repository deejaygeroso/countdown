import moment from "moment";

const getDuration = (startDate) => {
  var now = moment();
  var start = moment(startDate);
  var duration = moment.duration(now.diff(start));

  return duration;
};

export default getDuration;
