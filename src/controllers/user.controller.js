import UserService from "../services/user.service.js";

class UserController {
  // // create new user
  // async createUser(req, res) {
  //   const { body } = req;
  //   body.email = body.email.toLowerCase();

  //   // check if user is already registered
  //   const existingUserEmail = await UserService.findUser({
  //     email: body.email,
  //   });
  //   if (existingUserEmail) {
  //     return res.status(404).send({
  //       success: false,
  //       message: "User already exists",
  //     });
  //   }
  //   // create user
  //   const newUser = await UserService.createUser({ body });
  //   res.status(200).send({
  //     success: true,
  //     message: "User successfully created",
  //     data: newUser,
  //   });
  // }

  //find all users
  // async findUsers(req, res) {
  //   // const { query } = req;
  //   const users = await UserService.findUsers();
  //   res.status(200).send({
  //     success: true,
  //     message: "All users successfully retrieved",
  //     data: users,
  //   });
  // }

  // async findUsers(req, res) {
  //   const { role, specialty } = req.query;
  //   const query = {};
  //   if (role) {
  //     query.role = role;
  //     query.specialty = specialty;
  //   }
  //   const users = await UserService.findUsers(query);
  //   res.status(200).send({
  //     success: true,
  //     message: "All users successfully retrieved",
  //     data: users,
  //   });
  // }

  //retrieve all users

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
    const updatedUser = await UserService.updateUser({ id, body });
    res.status(200).send({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  }

  //delete user
  async delUser(req, res) {
    const userId = req.params.id;
    const deletedUser = await UserService.delUser(userId);
    res.status(200).send({
      success: true,
      message: "Changes saved successfully",
      data: deletedUser,
    });
  }
}

export default new UserController();
