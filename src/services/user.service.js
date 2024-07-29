import userModel from "../models/user.model.js";

class UserService {
  // create new user
  async createUser(userData) {
    const newUser = await userModel.create(userData);
    return newUser;
  }

  // retrieve all users
  async findUsers() {
    const users = await userModel.find();
    return users;
  }

  // retrieve one user
  async findUser(query) {
    const user = await userModel.findOne(query);
    return user;
  }

  // // update a user by id
  // async updateUser(id, data) {
  //   const updatedUser = await userModel.findByIdAndUpdate(id, data, {
  //     new: true,
  //   });
  //   return updatedUser;
  // }

  // // delete user by id
  // async delUser(id) {
  //   const deletedUser = await userModel.findByIdAndDelete(id);
  //   return deletedUser;
  // }
}

export default new UserService();
