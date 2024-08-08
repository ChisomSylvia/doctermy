import appointmentModel from "../models/appointment.model.js";

class AppointmentService {
  //request appointment
  async createAppointment(data) {
    const newAppointment = await appointmentModel.create(data);
    return newAppointment;
  }

  //find appointment that matches an id
  async getAppointment(id) {
    const appointment = await appointmentModel.findById(id);
    return appointment;
  }

  //retrieve all appointments that matches a query
  async getAllAppointments(query) {
    const allAppointments = await appointmentModel.find(query);
    return allAppointments;
  }

  //update appointment
  async update(id, data) {
    const newStatus = await appointmentModel.findByIdAndUpdate(id, data, {new: true});
    return newStatus;
  }

}

export default new AppointmentService();