import UserService from "../services/user.service.js";
import { USER_TYPES } from "../utils/user.js";

class UserController {
  //find all users
  async findUsers(req, res) {
    //query here returns users that matches a specific query or all users if there's no query
    const { query } = req;

    //prepare to find all users data. query ? users that matches a query : all users
    const users = await UserService.findUsers(query);
    //return all found users
    return res.status(200).send({
      success: true,
      message: "All users successfully retrieved",
      data: users,
    });
  }

  //find a user
  async findUser(req, res) {
    //query here allows only an ID params not query ID which returns a particular user
    const query = { _id: req.params.id };

    //prepare to find user data. query ? user that matches an ID : null
    const user = await UserService.findUser(query);

    //return found user
    return res.status(200).send({
      success: true,
      message: "User successfully retrieved",
      data: user,
    });
  }

  //update user
  async updateUser(req, res) {
    const userId = req.user._id;
    const userType = req.user.role;
    const { id } = req.params; //can use query here and assign the ID to it (const query = {_id: req.params.id})
    const query = { _id: req.params.id };
    const { body } = req;

    // Check if the user exists
    const user = await UserService.findUser(query);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User do not exist",
      });
    }

    //allow patients and doctors to modify only their own data. NB: admins can modify anyone's data
    if (userType === USER_TYPES.PATIENT || userType === USER_TYPES.DOCTOR) {
      if (user._id.toString() !== userId.toString()) {
        return res.status(403).send({
          success: false,
          message: "Unauthorized access",
        });
      }
    }

    //prepare to update user data. ID ? user that matches an ID : null
    const updatedUser = await UserService.updateUser(id, body);
    //return updated data
    return res.status(200).send({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  }

  //delete user
  async delUser(req, res) {
    const userId = req.user._id;
    const userType = req.user.role;
    const { id } = req.params; //can use query here and assign the ID to it (const query = {_id: req.params.id})
    const query = { _id: req.params.id };

    // Check if the user exists
    const user = await UserService.findUser(query);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User do not exist",
      });
    }

    //allow patients and doctors to modify only their own data. NB: admins can modify anyone's data
    if (userType === USER_TYPES.PATIENT || userType === USER_TYPES.DOCTOR) {
      if (user._id.toString() !== userId.toString()) {
        return res.status(403).send({
          success: false,
          message: "Unauthorized access",
        });
      }
    }

    //prepare to delete user data. ID ? user that matches an ID : null
    const deletedUser = await UserService.delUser(id);
    //return deleted user
    return res.status(200).send({
      success: true,
      message: "User deleted successfully",
      data: deletedUser,
    });
  }
}

export default new UserController();
