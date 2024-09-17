const USER_TYPES = {
  PATIENT: "Patient",
  DOCTOR: "Doctor",
  ADMIN: "Admin",
  SUPERADMIN: "Super Admin"
}

const GENDER = {
  MALE: "Male",
  FEMALE: "Female",
  OTHER: "Other"
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

const SPECIALTY = {
  ORTHOPEDICS: "Orthopedics",
  PEDIATRICS: "Pediatrics",
  NEUROLOGY: "Neurology",
  GYNAECOLOGY: "Gynaecology",
  SURGERY: "Surgery",
  CARDIOLOGY: "Cardiology",
  ONCOLOGY: "Oncology",
  GERIATRICS: "Geriatrics",
  PSYCHIATRY: "Psychiatry",
  RADIOLOGY: "Radiology",
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

  const PAYMENT_STATUS = {
    PAID: "Paid",
    NOT_PAID: "Not paid"
  }


export { USER_TYPES, GENDER, APPOINTMENT_TYPES, STATUS, SPECIALTY, DAYS, TIME_SLOTS, PAYMENT_STATUS };