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

export { USER_TYPES, APPOINTMENT_TYPES, STATUS };