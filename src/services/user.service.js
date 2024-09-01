import userModel from "../models/user.model.js";

class UserService {
  // create new user
  async createUser(userData) {
    const newUser = await userModel.create(userData);
    return newUser;
  }

  //can omit query here and pass an empty parameter, it will return all users but cannot filter based on a passed query
  // retrieve all users
  async findUsers(query) {
    const users = await userModel.find(query);
    return users;
  }

  //can use ID here instead of query and then call findById; in controller call the ID in req.params
  // retrieve one user
  async findUser(query) {
    const user = await userModel.findOne(query);
    return user;
  }

  // update a user by id
  //can use query instead of ID and then call findOneAndUpdate, then pass the ID as params inside the query in controller
  async updateUser(id, data) {
    const updatedUser = await userModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updatedUser;
  }

  // delete user by id.....check out soft delete
  //can use query here too just like in update and call findOneAndDelete
  async delUser(id) {
    const deletedUser = await userModel.findByIdAndDelete(id);
    return deletedUser;
  }
}

export default new UserService();
