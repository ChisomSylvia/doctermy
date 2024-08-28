import PatientNotificationService from "../services/patientNotification.service.js";
import DoctorNotificationService from "../services/doctorNotification.service.js";
import { USER_TYPES } from "../utils/user.js";

class NotificationController {
  //get one notification that matches a query
  async getOneNotification(req, res) {
    const userId = req.user._id;
    const userType = req.user.role;
    const query = { _id: req.params.id, userId: userId };

    // select the correct notification service based on user type
    const NotificationService =
      userType === USER_TYPES.PATIENT
        ? PatientNotificationService
        : userType === USER_TYPES.DOCTOR
        ? DoctorNotificationService
        : null;

    if (!NotificationService) {
      return res.status(403).send({
        success: false,
        message: "Unauthorized user type",
      });
    }

    //find notification using the query object
    const notification = await NotificationService.getNotification(query);
    if (!notification) {
      return res.status(404).send({
        success: false,
        message: "Notification does not exist",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Notification retrieved sucessfully",
      data: notification,
    });
  }

  //retrieve all notifications that matches a query ie. the user id
  async getAllNotifications(req, res) {
    const userId = req.user._id;
    const userType = req.user.role;
    const query = { userId: userId };

    const NotificationService =
      userType === USER_TYPES.PATIENT
        ? PatientNotificationService
        : userType === USER_TYPES.DOCTOR
        ? DoctorNotificationService
        : null;

    if (!NotificationService) {
      return res.status(403).send({
        success: false,
        message: "Unauthorized user type",
      });
    }

    //retrieve all notifications query object
    const allNotifications = await NotificationService.getAllNotifications(
      query
    );
    if (!allNotifications) {
      return res.status(404).send({
        success: false,
        message: "Notification does not exist",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Notifications retrieved sucessfully",
      data: allNotifications,
    });
  }

  //update notification
  async updateNotification(req, res) {
    const { isRead } = req.body;
    const userId = req.user._id;
    const userType = req.user.role;
    const query = { _id: req.params.id, userId: userId };

    // select the correct notification service based on user type
    const NotificationService =
      userType === USER_TYPES.PATIENT
        ? PatientNotificationService
        : userType === USER_TYPES.DOCTOR
        ? DoctorNotificationService
        : null;

    if (!NotificationService) {
      return res.status(403).send({
        success: false,
        message: "Unauthorized user type",
      });
    }

    // check if the notification exists
    const foundNotification = await NotificationService.getNotification(query);
    if (!foundNotification) {
      return res.status(404).send({
        success: false,
        message: "Notification does not exist",
      });
    }

    // set isRead to true if it is false or true (when the notification is being opened)
    isRead === false ? true : null;

    const updatedNotification = await NotificationService.updateNotification(
      query,
      { isRead: isRead }
    );

    res.status(200).send({
      success: true,
      message: "Notification updated successfully",
      data: updatedNotification,
    });
  }

  //delete notification
  async delNotification(req, res) {
    const userType = req.user.role;
    const userId = req.user._id;
    const query = { _id: req.params.id, userId: userId };

    // select the correct notification service based on user type
    const NotificationService =
      userType === USER_TYPES.PATIENT
        ? PatientNotificationService
        : userType === USER_TYPES.DOCTOR
        ? DoctorNotificationService
        : null;

    if (!NotificationService) {
      return res.status(403).send({
        success: false,
        message: "Unauthorized user type",
      });
    }

    // check if the notification exists
    const foundNotification = await NotificationService.getNotification(query);
    if (!foundNotification) {
      return res.status(404).send({
        success: false,
        message: "Notification does not exist",
      });
    }

    const deletedNotification = await NotificationService.delNotification(
      query
    );

    res.status(200).send({
      success: true,
      message: "Notification deleted successfully",
      data: deletedNotification,
    });
  }
}

export default new NotificationController();



// //retrieve all notifications or those that matches a query
// async getAllNotifications(req, res) {
//   const userId = req.user._id;
//   const userType = req.user.role;
//   const query = {};

//   let allNotifications;

//   if (userType === USER_TYPES.PATIENT) {
//     query.userId = userId;
//     console.log("patient", userId);
//     //retrieve all notifications based on passed query
//     allNotifications = await PatientNotificationService.getAllNotifications(
//       query
//     );
//   }
//   if (userType === USER_TYPES.DOCTOR) {
//     query.userId = userId;
//     console.log("doctor", userId);
//     //retrieve all notifications based on passed query
//     allNotifications = await DoctorNotificationService.getAllNotifications(
//       query
//     );
//   }

//   // if (!allNotifications) {
//   //   return res.status(404).send({
//   //     success: false,
//   //     message: "Notifications that matches the query does not exists",
//   //   });
//   // }

//   // if (allNotifications.userId !== userId) {
//   //   return res.status(403).send({
//   //     success: false,
//   //     message: "Unauthorized access",
//   //   });
//   // }

//   return res.status(200).send({
//     success: true,
//     message: "Notifications retrieved sucessfully",
//     data: allNotifications,
//   });
// }
