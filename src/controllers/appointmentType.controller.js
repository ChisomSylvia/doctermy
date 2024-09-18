import AppointmentTypeService from "../services/appointmentType.service.js";

class AppointmentTypeController {
  //to create a new appointment type
  async createAppointmentType(req, res) {
    const { body } = req;

    //check if appointment type already exists
    const foundAppointmentType =
      await AppointmentTypeService.getOneAppointmentType({name: body.name});
    if (foundAppointmentType) {
      return res.status(400).json({
        success: false,
        message: "Apoointment type already exists",
      });
    }

    //create new appointment type
    const newAppointmentType =
      await AppointmentTypeService.createAppointmentType(body);

    return res.status(201).send({
      success: true,
      message: "Appointment type created successfully",
      data: newAppointmentType,
    });
  }

  //retrieve one appointment type
  async getOneAppointmentType(req, res) {
    const query = { _id: req.params.id, isDeleted: false };

    const appointmentType = await AppointmentTypeService.getOneAppointmentType(
      query
    );
    if (!appointmentType) {
      return res.status(404).send({
        success: false,
        message: "Appointment type not found or has been deleted",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Appointment type successfully retrieved",
      data: appointmentType,
    });
  }

  //retrieve all appointment types
  async getAppointmentTypes(req, res) {
    const { query } = req;
    query.isDeleted = false;

    const appointmentTypes = await AppointmentTypeService.getAppointmentTypes(
      query
    );
    if (appointmentTypes.length === 0) {
      return res.status(200).send({
        success: true,
        message: "Appointments not found",
        data: [],
      });
    }

    return res.status(200).send({
      success: true,
      message: "All appointment types successfully retrieved",
      data: appointmentTypes,
    });
  }

  //update appointment type
  async updateAppointmentType(req, res) {
    const { body } = req;
    const query = { _id: req.params.id, isDeleted: false };

    // Check if appointment type exists
    const appointmentType = await AppointmentTypeService.getOneAppointmentType(
      query
    );
    if (!appointmentType) {
      return res.status(404).send({
        success: false,
        message: "Appointment type not found or has been deleted",
      });
    }

    const updatedAppointmentType =
      await AppointmentTypeService.updateAppointmentType(query, body);
    return res.status(200).send({
      success: true,
      message: "Appointment type updated successfully",
      data: updatedAppointmentType,
    });
  }

  //soft delete appointment type
  async delAppointmentType(req, res) {
    const query = { _id: req.params.id, isDeleted: false };

    // Check if appointment type exists
    const appointmentType = await AppointmentTypeService.getOneAppointmentType(
      query
    );
    if (!appointmentType) {
      return res.status(404).send({
        success: false,
        message: "Appointment type not found or has already been deleted",
      });
    }

    const deletedAppointmentType =
      await AppointmentTypeService.delAppointmentType({ _id: req.params.id });
    return res.status(200).send({
      success: true,
      message: "Appointment type soft-deleted successfully",
      data: deletedAppointmentType,
    });
  }
}

export default new AppointmentTypeController();