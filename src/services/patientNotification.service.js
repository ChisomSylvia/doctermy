import patientNotificationModel from "../models/patientNotification.model.js";

class PatientNotificationService {
  //request notification
  async createNotification(data) {
    const newPatientNotification = await patientNotificationModel.create(data);
    return newPatientNotification;
  }

  //find notification that matches an id
  async getNotification(query) {
    const patientNotification = await patientNotificationModel.findOne(query);
    return patientNotification;
  }

  //retrieve all notifications that matches a query
  async getAllNotifications(query) {
    const allPatientNotifications = await patientNotificationModel.find(query);
    return allPatientNotifications;
  }

  //update notification
  async updateNotification(query, data) {
    const updatedPatientNotification = await patientNotificationModel.findOneAndUpdate(
      query,
      data,
      { new: true }
    );
    return updatedPatientNotification;
  }

  //delete notification
  async delNotification(query) {
    const delPatientNotification =
      await patientNotificationModel.findOneAndDelete(query);
    return delPatientNotification;
  }
}

export default new PatientNotificationService();
