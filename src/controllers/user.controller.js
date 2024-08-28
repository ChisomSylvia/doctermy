import UserService from "../services/user.service.js";

class UserController {
  async findUsers(req, res) {
    const { role, specialty } = req.query;
    const query = {};

    if (role) query.role = role;

    if (specialty) query.specialty = specialty;

    const users = await UserService.findUsers(query);
    res.status(200).send({
      success: true,
      message: "All users successfully retrieved",
      data: users,
    });
  }

  //find a user
  async findUser(req, res) {
    const { query } = req;
    const user = await UserService.findUser(query);
    res.status(200).send({
      success: true,
      message: "User successfully retrieved",
      data: user,
    });
  }

  //update user
  async updateUser(req, res) {
    const { id } = req.params;
    const { body } = req;
    const updatedUser = await UserService.updateUser(id, body);
    res.status(200).send({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  }

  //delete user
  async delUser(req, res) {
    const { id } = req.params;
    const deletedUser = await UserService.delUser(id);
    res.status(200).send({
      success: true,
      message: "User deleted successfully",
      data: deletedUser,
    });
  }
}

export default new UserController();
