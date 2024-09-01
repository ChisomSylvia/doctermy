import moment from "moment-timezone";

// Helper function to convert timeValue and date to startTime
function convertToStartTime(timeValue, date) {
  const [time, period] = timeValue.match(/(\d+)(am|pm)/).slice(1);
  const hour = period === "pm" && time !== "12" ? parseInt(time) + 12 : period === 'am' && time === 12 ? parseInt(time) = 0 : parseInt(time);

  return moment(date)
    .set({
      hour: hour,
      minute: 0,
      second: 0,
      millisecond: 0,
    })
    .toDate();
}

// function convertToStartTime(timeValue, date, timeZone = "Africa/Lagos") {
  
//   //validate and parse the time
//   const [time, period] = timeValue.match(/(\d+)(am|pm)/).slice(1);
//   const hour = period === "pm" && time !== "12" ? parseInt(time) + 12 : period === 'am' && hour === 12 ? parseInt(time) = 0 : parseInt(time);

//   //convert to UTC
//   const utcTime = moment.tz(date, timeZone) // Start with the local date and time zone
//     .set({
//       hour: hour,
//       minute: 0,
//       second: 0,
//       millisecond: 0,
//     })
//     .utc() // convert the local time to UTC for storage in MongoDB
//     .toDate(); // convert the moment object to a JavaScript Date object

//   return utcTime;
// }

export { convertToStartTime };