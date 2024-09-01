import appointmentModel from "../models/appointment.model.js";

class AppointmentService {
  //create appointment
  async createAppointment(data) {
    const newAppointment = await appointmentModel.create(data);
    return newAppointment;
  }

  //retrieve all appointments || those that matches a query
  async getAllAppointments(query) {
    const allAppointments = await appointmentModel
      .find(query)
      .populate("patientId", "name")
      .populate("doctorId", "name");
    return allAppointments;
  }

  //find appointment that matches an id
  async getOneAppointment(query) {
    const appointment = await appointmentModel
      .findOne(query)
      .populate("patientId", "name")
      .populate("doctorId", "name");
    return appointment;
  }

  //update appointment
  async update(query, data) {
    const updatedAppointment = await appointmentModel.findOneAndUpdate(
      query,
      data,
      { new: true }
    );
    return updatedAppointment;
  }

  //delete appointment
  async delAppointment(query) {
    const deletedAppointment = await appointmentModel.findOneAndDelete(query);
    return deletedAppointment;
  }
}

export default new AppointmentService();
