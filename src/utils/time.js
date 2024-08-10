import moment from "moment";

// Helper function to convert timeValue and date to startTime
function convertToStartTime(timeValue, date) {
  const [time, period] = timeValue.match(/(\d+)(am|pm)/).slice(1);
  return moment(date)
    .set({
      hour:
        period === "pm" && time !== "12" ? parseInt(time) + 12 : parseInt(time),
      minute: 0,
      second: 0,
      millisecond: 0,
    })
    .toDate();
}
export { convertToStartTime };
