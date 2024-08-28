import moment from "moment-timezone";

// Helper function to convert timeValue and date to startTime
function convertToStartTime(timeValue, date) {
  const [time, period] = timeValue.match(/(\d+)(am|pm)/).slice(1);
  return moment.utc(date)
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



// import moment from "moment-timezone";

// function convertToStartTime(timeValue, date) {
//   const [time, period] = timeValue.match(/(\d+)(am|pm)/).slice(1);
//   const hour =
//     period === "pm" && time !== "12" ? parseInt(time) + 12 : parseInt(time);

//   // Set the date and time in the 'Europe/Lagos' time zone (GMT+1)
//   const localDate = moment.tz(date, "Europe/Lagos").set({
//     hour: hour,
//     minute: 0,
//     second: 0,
//     millisecond: 0,
//   });

//   // Convert the local date and time to UTC before saving to the database
//   const utcDate = localDate.utc().toDate();

//   return utcDate;
// }