import UserService from "../services/user.service.js";
import {
  encryptData,
  decryptData,
  generateUserToken,
} from "../utils/dataCrypto.js";
import { USER_TYPES } from "../utils/user.js";

class AuthController {
  /***** CREATE SUPER_ADMIN *****/
  //create super admin
  async createSuperAdmin(req, res) {
    //get user data from req.body
    const { body } = req;
    body.email = body.email.toLowerCase();

    if (USER_TYPES.SUPERADMIN) {
      body.password = "user";
    }

    //hash password
    const hashedPassword = await encryptData(body.password);

    //create new user
    const newUser = await UserService.createUser({
      ...body,
      password: hashedPassword,
      role: USER_TYPES.SUPERADMIN,
    });

    return res.status(201).send({
      success: true,
      message: "User successfully registered",
      data: newUser,
    });
  }

  /***** CREATE ADMIN *****/
  //create admin
  async createAdmin(req, res) {
    //get user data from req.body
    const { body } = req;
    body.email = body.email.toLowerCase();

    if (USER_TYPES.ADMIN) {
      body.password = "user";
    }

    //hash password
    const hashedPassword = await encryptData(body.password);

    //create new user
    const newAdmin = await UserService.createUser({
      ...body,
      password: hashedPassword,
      role: USER_TYPES.ADMIN,
    });

    return res.status(201).send({
      success: true,
      message: "User successfully registered",
      data: newAdmin,
    });
  }

  /***** ADD DOCTORS *****/
  //add doctors
  async addDoctors(req, res) {
    //get user data from req.body
    const { body } = req;
    // const days = req.user.days;
    // const time = req.user.time;
    body.email = body.email.toLowerCase();

    if (USER_TYPES.DOCTOR) {
      body.password = "user";
    }

    //hash password
    const hashedPassword = await encryptData(body.password);

    //   if (days === null) {
    //       return res.status(403).send({
    //       success: false,
    //       message: "Days is required",
    //   })
    // }

    //   if (time === null) {
    //       return res.status(403).send({
    //       success: false,
    //       message: "Time is required",
    //   })
    // }

    //create new user
    const newDoctor = await UserService.createUser({
      ...body,
      password: hashedPassword,
      role: USER_TYPES.DOCTOR,
    });

    return res.status(201).send({
      success: true,
      message: "User successfully registered",
      data: newDoctor,
    });
  }

  /***** SIGN UP PATIENTS *****/
  //sign up users
  async signUp(req, res) {
    //get user data from req.body
    const { body } = req;
    body.email = body.email.toLowerCase();

    // check if user is already registered
    // check if email is already registered
    const existingUserEmail = await UserService.findUser({
      email: body.email,
    });
    if (existingUserEmail) {
      return res.status(404).send({
        success: false,
        message: "Email already exists",
      });
    }
    // check if phoneNumber is already registered
    const existingUserPhoneNumber = await UserService.findUser({
      phoneNumber: body.phoneNumber,
    });
    if (existingUserPhoneNumber) {
      return res.status(404).send({
        success: false,
        message: "Phone number already exists",
      });
    }

    //hash password
    const hashedPassword = await encryptData(body.password);

    //create new user
    const newUser = await UserService.createUser({
      ...body,
      password: hashedPassword,
      role: USER_TYPES.PATIENT,
    });

    //create token as cookie to user
    const token = generateUserToken(newUser);

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

  /***** LOGIN *****/
  //login users
  async login(req, res) {
    //user data from req.body
    const { body } = req;
    body.email = body.email.toLowerCase();

    //compare login email and sign up email
    //retrieve data from database
    const user = await UserService.findUser({
      email: body.email,
    });
    //if data does not exist on the database
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "invalid email",
      });
    }

    //compare login password with sign up password
    //compare password with user saved password
    const isValidPassword = await decryptData(body.password, user.password);
    //if not valid password
    if (!isValidPassword) {
      return res.status(400).send({
        success: false,
        message: "Invalid password",
      });
    }

    //create token and assign it to the email
    const token = generateUserToken(user);

    //pass token as cookie
    res.cookie("myToken", token, {
      httpOnly: true,
      maxAge: 604800000,
    });

    return res.status(200).send({
      success: true,
      message: "User successfully logged in",
      data: user,
      myToken: token
    });
  }

  /***** LOGOUT *****/
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
    });
  }
}

export default new AuthController();
