const USER_TYPES = {
  PATIENT: "Patient",
  DOCTOR: "Doctor",
  ADMIN: "Admin",
  SUPERADMIN: "Super Admin" //change to super_admin
}

const APPOINTMENT_TYPES = {
  CONSULTATION: "Consultation",
  TREATMENT: "Treatment",
  SURGERY: "Surgery",
  CHECKUP: "CheckUp",
  LABTEST: "Lab Test"
}

const STATUS = {
  PENDING: "Pending",
  APPROVED: "Approved",
  DECLINED: "Declined",
  COMPLETED: "Completed"
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

const TIME_SLOTS = [
    "6am",
    "7am",
    "8am",
    "9am",
    "10am",
    "11am",
    "12pm",
    "1pm",
    "2pm",
    "3pm",
    "4pm",
    "5pm",
    "6pm",
    "7pm",
    "8pm",
    "9pm",
    "10pm",
    "11pm",
    "12am"
  ]


export { USER_TYPES, APPOINTMENT_TYPES, STATUS, DAYS, TIME_SLOTS };