import AppointmentService from "../services/appointment.service.js";
import { USER_TYPES, STATUS } from "../utils/user.js";

class AppointmentController {
  async createAppointment(req, res) {
    const { body } = req;
    const patientId = req.user._id;
    const newAppointment = await AppointmentService.createAppointment({
      ...body,
      patientId,
    });
    res.status(201).send({
      success: true,
      message: "Appointment request sent sucessfully",
      data: newAppointment,
    });
  }

  //retrieve appointment that matches an id
  async getAppointment(req, res) {
    const { query } = req;
    const userId = req.user._id;
    const userType = req.user.role;

    if (userType === USER_TYPES.PATIENT) {
      query.patientId = userId;
    } else if (userType === USER_TYPES.DOCTOR) {
      query.doctorId = userId;
    } else if (userType === USER_TYPES.ADMIN) {
      query.adminId = userId;
    } else {
      return res.status(400).send({
        success: false,
        message: "Unauthorized access",
      });
    }

    const appointment = await AppointmentService.getAppointment(query);
    if (!appointment) {
      return res.status(404).send({
        success: false,
        message: "No record found!",
      });
    }
    res.status(200).send({
      success: true,
      message: "Appointment retrieved sucessfully",
      data: appointment,
    });
  }

  //retrieve all appointments that matches a query
  async getAllAppointments(req, res) {
    const { query } = req;
    const userId = req.user._id;
    const userType = req.user.role;

    let appointmentQuery = { ...query };

    if (userType !== USER_TYPES.ADMIN) {
      appointmentQuery = {
        ...query,
        $or: [{ patientId: userId }, { doctorId: userId }],
      };
    }

    const allAppointments = await AppointmentService.getAllAppointments({
      ...appointmentQuery
  });
    res.status(200).send({
      success: true,
      message: "Appointments retrieved sucessfully",
      data: allAppointments,
    });
  }

  //update appointment status
  async update(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user._id;
    const userType = req.user.role;

    //check if appointment already exists
    const foundAppointment = await AppointmentService.getAppointment(id);
    if (!foundAppointment) {
      return res.status(404).send({
        success: false,
        message: "Appointment does not exist",
      });
    }
    //check if appointment has been approved or declined
    if (foundAppointment.status !== STATUS.PENDING) {
      return res.status(400).send({
        success: false,
        message: "You can no longer modify appointment",
      });
    }

    // Check if selected status is valid
    if (![STATUS.APPROVED, STATUS.DECLINED].includes(status)) {
      return res.status(400).send({
        success: false,
        message: "Invalid status update",
      });
    }

    const query = { _id: id };
    if (userType === USER_TYPES.PATIENT) {
      query.patientId = userId;
    } else if (userType === USER_TYPES.DOCTOR) {
      query.doctorId = userId;
    } else {
      return res.status(400).send({
        success: false,
        message: "Unauthorized access",
      });
    }

    const updatedStatus = await AppointmentService.update(query, {
      status,
      doctorUpdatedAt: Date.now(),
    });
    res.status(200).send({
      success: true,
      message: "Appointment status updated sucessfully",
      data: updatedStatus,
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