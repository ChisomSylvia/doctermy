import AppointmentService from "../services/appointment.service.js";
import { USER_TYPES, STATUS } from "../utils/user.js";

class AppointmentController {
  async createAppointment(req, res) {
    const { body } = req;
    const userId = req.user._id;
    const userType = req.user.role;

    if (userType === USER_TYPES.PATIENT) {
      body.patientId = userId;
    }
    if (userType === USER_TYPES.DOCTOR) {
      body.doctorId = userId;
    }
    const newAppointment = await AppointmentService.createAppointment({
      ...body,
      userId,
    });

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

  //retrieve all appointments that matches a query
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

    //another format to write the if statement above
    // let appointmentQuery = { ...query };

    // if (userType !== USER_TYPES.ADMIN || userType !== USER_TYPES.SUPERADMIN) {
    //   appointmentQuery = {
    //     ...query,
    //     $or: [{ patientId: userId }, { doctorId: userId }],
    //   };
    // }

    const allAppointments = await AppointmentService.getAllAppointments(query);
    res.status(200).send({
      success: true,
      message: "Appointments retrieved sucessfully",
      data: allAppointments,
    });
  }

  //update appointment status
  async update(req, res) {
    const { id } = req.params;
    // const { body } = req;
    const { status, ...otherUpdates } = req.body;
    const userType = req.user.role;
    // const { query } = req;

    //check if appointment already exists
    const foundAppointment = await AppointmentService.getAppointment(id);
    if (!foundAppointment) {
      return res.status(404).send({
        success: false,
        message: "Appointment does not exist",
      });
    }
    //check if appointment has been approved or declined
    if (userType === USER_TYPES.PATIENT && foundAppointment.status !== STATUS.PENDING) {
      return res.status(400).send({
        success: false,
        message: "You can no longer modify appointment",
      });
    }

    // Check if the person is a doctor and if they are trying to set an invalid status
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

    if (userType === USER_TYPES.PATIENT && status === STATUS.PENDING) {
      return res.status(403).send({
        success: false,
        message: "Patients are not allowed to make status update",
      });
    }

    const updateData = { ...otherUpdates };
    if (userType === USER_TYPES.DOCTOR && status !== STATUS.PENDING) {
      updateData.status = status;
      updateData.doctorUpdatedAt = Date.now();
    }

    const updatedAppointment = await AppointmentService.update(
      id,
      updateData
      // id,
      // body, {
      //   status,
      //   doctorUpdatedAt: Date.now(),
      // }
    );
    res.status(200).send({
      success: true,
      message: "Appointment updated sucessfully",
      data: updatedAppointment,
    });
  }
}

export default new AppointmentController();

// //update appointment
// async updateAppointment(req, res) {
//   const { id } = req.params;
//   const { body } = req;
//   //check if appointment already exists
//   const foundAppointment = await AppointmentService.getAppointment(id);
//   if (!foundAppointment) {
//     return res.status(404).send({
//       success: false,
//       message: "Appointment does not exist",
//     });
//   }
//   //check if appointment has been approved or declined
//   if (foundAppointment.status !== STATUS.PENDING) {
//     return res.status(400).send({
//       success: false,
//       message: "You can no longer modify appointment",
//     });
//   }
//   //update appointment
//   const updatedAppointment = await AppointmentService.updateAppointment({
//     id,
//     body,
//   });
//   res.status(200).send({
//     success: true,
//     message: "Appointment retrieved sucessfully",
//     data: updatedAppointment,
//   });
// }
