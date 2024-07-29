import UserService from "../services/user.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class UserController {
  //sign up users
  async signUp(req, res) {
    //get user data from req.body
    const userData = req.body;

    // check if user is already registered
    // check if email is already registered
    const existingUserEmail = await UserService.findUser({
      email: userData.email,
    });
    if (existingUserEmail) {
      return res.status(404).send({
        success: false,
        message: "Email already exists",
      });
    }
    // check if phoneNumber is already registered
    const existingUserPhoneNumber = await UserService.findUser({
      phoneNumber: userData.phoneNumber,
    });
    if (existingUserPhoneNumber) {
      return res.status(404).send({
        success: false,
        message: "Phone number already exists",
      });
    }

    //hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    //create new user
    const newUser = await UserService.createUser({
      name: userData.name,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      password: hashedPassword,
      userType: userData.userType,
    });

    //create token as cookie to user
    const token = jwt.sign(
      {
        _id: newUser._id,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        userType: newUser.userType,
      },
      process.env.SECRET,
      {
        expiresIn: 604800,
      }
    );
    //return created token as cookie to user
    res.cookie("myToken", token, {
      httpOnly: true,
      maxAge: 604800000,
    });

    return res.status(201).send({
      success: true,
      message: "User successfully registered",
      data: newUser,
    });
  }

  //login users
  async login(req, res) {
    //user data from req.body
    const user = req.body;

    //compare login email and sign up email
    //retrieve data from database
    const regUser = await UserService.findUser({
      email: user.email,
    });
    //if data does not exist on the database
    if (!regUser) {
      return res.status(400).send({
        success: false,
        message: "invalid email",
      });
    }

    //compare login password with sign up password
    //compare password with user saved password
    const isValidPassword = await bcrypt.compare(
      user.password,
      regUser.password
    );
    //if not valid password
    if (!isValidPassword) {
      return res.status(400).send({
        success: false,
        message: "invalid password",
      });
    }

    //create token and assign it to the email
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },
      process.env.SECRET,
      { expiresIn: 604800 }
    );

    //pass token as cookie
    res.cookie("myToken", token, {
      httpOnly: true,
      maxAge: 604800000,
    });

    return res.status(200).send({
      success: true,
      message: "User successfully logged in",
      data: regUser,
    });
  }

  // logout users
  async logout(req, res) {
    res.cookie("myToken", "", {
      httpOnly: true,
      expiresIn: new Date(0),
      // maxAge: new Date(0),
    });

    return res.status(200).send({
      success: true,
      message: "User successfully logged out",
      data: regUser,
    });
  }

  //find all users
  async findUsers(req, res) {
    const users = await UserService.findUsers();
    res.status(200).send({
      success: true,
      message: "All users successfully retrieved",
      data: users,
    });
  }
}

export default new UserController();
