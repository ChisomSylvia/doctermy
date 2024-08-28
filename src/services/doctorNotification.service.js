import doctorNotificationModel from "../models/doctorNotification.model.js";

class DoctorNotificationService {
  //request notification
  async createNotification(data) {
    const newDoctorNotification = await doctorNotificationModel.create(data);
    return newDoctorNotification;
  }

  //find notification that matches an id
  async getNotification(query) {
    const doctorNotification = await doctorNotificationModel.findOne(query);
    return doctorNotification;
  }

  //retrieve all notifications that matches a query
  async getAllNotifications(query) {
    const allDoctorNotifications = await doctorNotificationModel.find(query);
    return allDoctorNotifications;
  }

  //update notification
  async updateNotification(query, data) {
    const updatedDoctorNotification =
      await doctorNotificationModel.findOneAndUpdate(query, data, {
        new: true,
      });
    return updatedDoctorNotification;
  }

  //delete notification
  async delNotification(query) {
    const delDoctorNotification =
      await doctorNotificationModel.findOneAndDelete(query);
    return delDoctorNotification;
  }
}

export default new DoctorNotificationService();
