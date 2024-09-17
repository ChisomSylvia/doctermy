import AppointmentTypeModel from "../models/appointmentType.model.js";

class AppointmentTypeService {
  // create newAppointmentType
  async createAppointmentType(AppointmentType) {
    const newAppointmentType = await AppointmentTypeModel.create(
      AppointmentType
    );
    return newAppointmentType;
  }

  // retrieve allAppointmentTypes
  async getAppointmentTypes(query) {
    const AppointmentTypes = await AppointmentTypeModel.find(query);
    return AppointmentTypes;
  }

  // retrieve oneAppointmentType
  async getOneAppointmentType(query) {
    const AppointmentType = await AppointmentTypeModel.findOne(query);
    return AppointmentType;
  }

  // update aAppointmentType by id
  async updateAppointmentType(query, data) {
    const updatedAppointmentType = await AppointmentTypeModel.findOneAndUpdate(
      query,
      data,
      {
        new: true,
      }
    );
    return updatedAppointmentType;
  }

  // delete appointment type by id
  async delAppointmentType(query) {
    const deletedAppointmentType = await AppointmentTypeModel.findOneAndUpdate(
      query,
      { isDeleted: true },
      { new: true }
    );
    return deletedAppointmentType;
  }
}

export default new AppointmentTypeService();