import AppointmentService from "../services/appointment.service.js";
import { USER_TYPES, STATUS } from "../utils/user.js";
import { convertToStartTime } from "../utils/time.js";

class AppointmentController {
  //create/request for an appointment
  async createAppointment(req, res) {
    const { body } = req;
    const userId = req.user._id;
    const userType = req.user.role;

    // Set doctorId or patientId based on user role
    if (userType === USER_TYPES.PATIENT) {
      body.patientId = userId;
    } else if (userType === USER_TYPES.DOCTOR) {
      body.doctorId = userId;
    } else {
      return res.status(403).send({
        success: false,
        message: "Unauthorized user type",
      });
    }

    // Convert timeValue and date to startTime
    const startTime = convertToStartTime(body.timeValue, body.date);
    body.startTime = startTime;

    // Remove timeValue and date from the value object as they're not in the schema
    delete body.timeValue;
    delete body.date;

    const conflictingAppointment = await AppointmentService.getAppointment({
      doctorId: body.doctorId,
      startTime,
      status: { $in: [STATUS.PENDING, STATUS.APPROVED] },
    });

    // Check doctor availability
    if (conflictingAppointment) {
      return res.status(400).send({
        success: false,
        message: "Doctor is not available at the selected time",
      });
    }

    // Set status based on who's booking the appointment
    body.status =
      userType === USER_TYPES.DOCTOR ? STATUS.APPROVED : STATUS.PENDING;
    body.bookedBy = userType;

    const newAppointment = await AppointmentService.createAppointment(body);

    res.status(201).send({
      success: true,
      message: "Appointment request sent sucessfully",
      data: newAppointment,
    });
  }

  // //retrieve appointment that matches an id
  // async getAppointment(req, res) {
  //   const { query } = req;
  //   const userId = req.user._id;
  //   const userType = req.user.role;

  //   if (userType === USER_TYPES.PATIENT) {
  //     query.patientId = userId;
  //   }
  //   if (userType === USER_TYPES.DOCTOR) {
  //     query.doctorId = userId;
  //   }

  //   const appointment = await AppointmentService.getAppointment(query);
  //   if (!appointment) {
  //     return res.status(404).send({
  //       success: false,
  //       message: "No record found!",
  //     });
  //   }
  //   res.status(200).send({
  //     success: true,
  //     message: "Appointment retrieved sucessfully",
  //     data: appointment,
  //   });
  // }

  //retrieve all appointments or those that matches a query
  async getAllAppointments(req, res) {
    const { query } = req;
    const userId = req.user._id;
    const userType = req.user.role;

    if (userType === USER_TYPES.PATIENT) {
      query.patientId = userId;
    }
    if (userType === USER_TYPES.DOCTOR) {
      query.doctorId = userId;
    }

    // if (userType !== USER_TYPES.ADMIN && userType !== USER_TYPES.SUPERADMIN) {
    //   appointmentQuery = {
    //     ...query,
    //     $or: [{ patientId: userId }, { doctorId: userId }],
    //   };
    // }

    //retrieve all appointments based on passed query
    const allAppointments = await AppointmentService.getAllAppointments(query);
    res.status(200).send({
      success: true,
      message: "Appointments retrieved sucessfully",
      data: allAppointments,
    });
  }
  
  //update appointment
  async update(req, res) {
    // const { id } = req.params;
    const { query } = req;
    const { status, remark, ...otherUpdates } = req.body;
    const userType = req.user.role;

    //check if appointment already exists
    const foundAppointment = await AppointmentService.getAppointment(query);
    if (!foundAppointment) {
      return res.status(404).send({
        success: false,
        message: "Appointment does not exist",
      });
    }

    //check if appointment has been approved or declined
    if (
      userType === USER_TYPES.PATIENT &&
      foundAppointment.status !== STATUS.PENDING
    ) {
      return res.status(400).send({
        success: false,
        message: "You can no longer modify appointment",
      });
    }

    // Check if the doctor is trying to set an invalid status
    if (
      userType === USER_TYPES.DOCTOR &&
      status !== STATUS.APPROVED &&
      status !== STATUS.DECLINED
    ) {
      return res.status(400).send({
        success: false,
        message: "Invalid status update",
      });
    }

    //check if patients are trying to update status
    if (userType === USER_TYPES.PATIENT && status !== STATUS.PENDING) {
      return res.status(403).send({
        success: false,
        message: "Patients are not allowed to make status update",
      });
    }

    const updateData = { ...otherUpdates };
    //if user is a doctor, check if status is approved
    if (userType === USER_TYPES.DOCTOR) {
      if (foundAppointment.status === STATUS.APPROVED) {
        updateData.status = STATUS.COMPLETED;
      } else if (status) {
        updateData.status = status;
      }
      updateData.doctorUpdatedAt = Date.now();
      updateData.remark = remark;
    }

    const updatedAppointment = await AppointmentService.update(query, updateData);
    res.status(200).send({
      success: true,
      message: "Appointment updated sucessfully",
      data: updatedAppointment,
    });
  }
}

export default new AppointmentController();

