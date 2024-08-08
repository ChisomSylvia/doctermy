const USER_TYPES = {
  PATIENT: "patient",
  DOCTOR: "doctor",
  ADMIN: "admin",
  SUPERADMIN: "superAdmin"
}

const APPOINTMENT_TYPES = {
  CONSULTATION: "consultation",
  TREATMENT: "treatment",
  SURGERY: "surgery",
  CHECKUP: "checkUp",
  LABTEST: "labTest"
}

const STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  DECLINED: "declined"
}

const DAYS = {
  SUNDAY: "Sunday",
  MONDAY: "Monday",
  TUESDAY: "Tuesday",
  WEDNESDAY: "Wednesday",
  THURSDAY: "Thursday",
  FRIDAY: "Friday",
  SATURDAY: "Saturday"
}

const TIME_SLOTS = {
  MORNING_SLOTS: ["8am - 9am", "9am - 10am", "10am - 11am", "11am - 12pm"],
  AFTERNOON_SLOTS: ["1pm - 2pm", "2pm - 3pm", "3pm - 4pm", "4pm - 5pm"],
  EVENING_SLOTS: ["6pm - 7pm", "7pm - 8pm", "8pm - 9pm", "10pm - 11pm"]
}


export { USER_TYPES, APPOINTMENT_TYPES, STATUS, DAYS, TIME_SLOTS };