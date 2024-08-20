import AppointmentService from "../services/appointment.service.js";
import { USER_TYPES, STATUS } from "../utils/user.js";
import { convertToStartTime } from "../utils/time.js";
// import mongoose from "mongoose";

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

    // Set status and bookedBy based on who's booking the appointment
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

    //retrieve all appointments based on passed query
    const allAppointments = await AppointmentService.getAllAppointments(query);
    res.status(200).send({
      success: true,
      message: "Appointments retrieved sucessfully",
      data: allAppointments,
    });
  }

  //update appointment by patients
  async updateAppointment(req, res) {
    const { query } = req;
    const { status, remark, ...otherUpdates } = req.body;
    const userId = req.user._id;
    const userType = req.user.role;

    // // Check if the user is a patient and modify the query accordingly
    // if (userType === USER_TYPES.PATIENT) {
    //   query.patientId = userId;
    //     console.log(userId);
    //     console.log(query);
    // }

    // Check if the appointment exists

    const foundAppointment = await AppointmentService.getAppointment(query);
    if (!foundAppointment) {
      return res.status(404).send({
        success: false,
        message: "Appointment does not exist",
      });
    }

    if (userType === USER_TYPES.PATIENT) {
      // Ensure that patients can only modify their own appointment
      if (foundAppointment.patientId.toString() !== userId.toString()) {
        return res.status(403).send({
          success: false,
          message: "Unauthorized access",
        });
      }

      // Prevent patients from updating status or adding a remark
      if (status || remark) {
        return res.status(403).send({
          success: false,
          message: "Patients are not allowed to update status or add remarks",
        });
      }

      // Prevent modification if the appointment status is not pending
      if (foundAppointment.status !== STATUS.PENDING) {
        return res.status(400).send({
          success: false,
          message: "You can no longer modify the appointment",
        });
      }
    }

    // Convert timeValue and date to startTime
    const startTime = convertToStartTime(
      otherUpdates.timeValue,
      otherUpdates.date
    );
    otherUpdates.startTime = startTime;

    // Remove timeValue and date from the value object as they're not in the schema
    delete otherUpdates.timeValue;
    delete otherUpdates.date;

    // Update the appointment data (excluding status and remark if the user is a patient)
    const updatedAppointment = await AppointmentService.update(
      query,
      otherUpdates
    );
    res.status(200).send({
      success: true,
      message: "Appointment updated successfully",
      data: updatedAppointment,
    });
  }

  //update status by doctors
  async updateStatus(req, res) {
    const { query } = req;
    const { status, remark } = req.body;
    const userId = req.user._id;

    // // Validate the userId as an ObjectId
    // if (!mongoose.Types.ObjectId.isValid(userId)) {
    //   return res.status(400).send({
    //     success: false,
    //     message: "Invalid user ID",
    //   });
    // }

    // query.doctorId = userId;

    // // Validate any other ObjectId fields in query if applicable
    // if (
    //   query.appointmentId &&
    //   !mongoose.Types.ObjectId.isValid(query.appointmentId)
    // ) {
    //   return res.status(400).send({
    //     success: false,
    //     message: "Invalid appointment ID",
    //   });
    // }

    // //check if the appointment exists
    // const foundAppointment = await AppointmentService.getAppointment(query);
    // console.log(foundAppointment);
    // if (!foundAppointment) {
    //   return res.status(404).send({
    //     success: false,
    //     message: "Appointment does not exist",
    //   });
    // }

    query.doctorId = userId;

    //check if the appointment exists
    const foundAppointment = await AppointmentService.getAppointment(query);
    console.log(foundAppointment);
    if (!foundAppointment) {
      return res.status(404).send({
        success: false,
        message: "Appointment does not exist",
      });
    }

    // Check if the doctor is trying to set an invalid status
    if (
      status !== STATUS.APPROVED &&
      status !== STATUS.DECLINED &&
      status !== STATUS.COMPLETED
    ) {
      return res.status(400).send({
        success: false,
        message: "Invalid status update",
      });
    }

    //to prevent adding remarks to approved and completed appointments
    if (remark && status !== STATUS.DECLINED) {
      return res.status(400).send({
        success: false,
        message: "You cannot add remark to this status",
      });
    }

    //prepare the update data
    let updateData = { remark, status, doctorUpdatedAt: Date.now() };

    //to ensure remark is provided for declined appointments
    if (!remark && updateData.status === STATUS.DECLINED) {
      return res.status(400).send({
        success: false,
        message: "You must provide a remark",
      });
    }

    //to prevent pending and declined appointment from being updated to completed
    if (
      updateData.status === STATUS.COMPLETED &&
      foundAppointment.status !== STATUS.APPROVED
    ) {
      return res.status(400).send({
        success: false,
        message: "You cannot perform this action",
      });
    }

    //if the status is completed, register the end time
    if (status === STATUS.COMPLETED) {
      updateData.endTime = Date.now();
    }

    //update the appointment status
    const updatedAppointment = await AppointmentService.update(
      query,
      updateData
    );
    res.status(200).send({
      success: true,
      message: "Appointment status updated sucessfully",
      data: updatedAppointment,
    });
  }
}

export default new AppointmentController();
