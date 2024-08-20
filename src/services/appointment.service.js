import appointmentModel from "../models/appointment.model.js";

class AppointmentService {
  //request appointment
  async createAppointment(data) {
    const newAppointment = await appointmentModel.create(data);
    return newAppointment;
  }

  //find appointment that matches an id
  async getAppointment(query) {
    const appointment = await appointmentModel.findOne(query);
    return appointment;
  }

  //retrieve all appointments that matches a query
  async getAllAppointments(query) {
    const allAppointments = await appointmentModel.find(query);
    return allAppointments;
  }

  //update appointment
  async update(query, data) {
    const updatedAppointment = await appointmentModel.findOneAndUpdate(query, data, {new: true});
    return updatedAppointment;
  }

}

export default new AppointmentService();