import availabilityModel from "../models/availability.model.js";


class AvailabilityService {
  // create new user
  async create(data) {
    const newUser = await availabilityModel.create(data);
    return newUser;
  }

  // retrieve all users
  async findUsers(query) {
    const users = await userModel.find(query);
    return users;
  }

  // retrieve one user
  async findUser(query) {
    const user = await userModel.findOne(query);
    return user;
  }

  // update a user by id
  async updateUser(id, data) {
    const updatedUser = await userModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updatedUser;
  }

  // delete user by id.....check out soft delete
  async delUser(id) {
    const deletedUser = await userModel.findByIdAndDelete(id);
    return deletedUser;
  }
}

export default new AvailabilityService();
