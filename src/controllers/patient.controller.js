import PatientService from "../services/patient.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class PatientController {
  //sign up patients
  async signUp(req, res) {
    //get patient data from req.body
    const patientData = req.body;

    // check if patient is already registered
    // check if email is already registered
    const existingPatientEmail = await PatientService.findPatient({
      email: patientData.email,
    });
    if (existingPatientEmail) {
      return res.status(404).send({
        success: false,
        message: "Email already exists",
      });
    }
    // check if phoneNumber is already registered
    const existingPatientPhoneNumber = await PatientService.findPatient({
      phoneNumber: patientData.phoneNumber,
    });
    if (existingPatientPhoneNumber) {
      return res.status(404).send({
        success: false,
        message: "Phone number already exists",
      });
    }

    //hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(patientData.password, salt);

    //create new patient
    const newPatient = await PatientService.createPatient({
      name: patientData.name,
      email: patientData.email,
      phoneNumber: patientData.phoneNumber,
      password: hashedPassword,
    });

    //create token as cookie to patient
    const token = jwt.sign({ email: newPatient.email }, process.env.SECRET, {
      expiresIn: 604800,
    });
    //return created token as cookie to patient
    res.cookie("myToken", token, {
      httpOnly: true,
      maxAge: 604800000,
    });

    return res.status(201).send({
      success: true,
      message: "User successfully registered",
      newPatient,
    });
  }

  //login patients
  async login(req, res) {
    //patient data from req.body
    const patient = req.body;

    //compare login email and sign up email
    //retrieve data from database
    const regPatient = await PatientService.findPatient({
      email: patient.email,
    });
    //if data does not exist on the database
    if (!regPatient) {
      return res.status(400).send({
        success: false,
        message: "invalid email",
      });
    }

    //compare login password with sign up password
    //compare password with patient saved password
    const isValidPassword = await bcrypt.compare(
      patient.password,
      regPatient.password
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
        email: patient.email,
      },
      process.env.SECRET,
      { expiresIn: 604800 }
    );

    //cookie assigned token
    res.cookie("myToken", token, {
      httpOnly: true,
      maxAge: 604800000,
    });

    return res.status(200).send({
      success: true,
      message: "User successfully logged in",
      regPatient,
    });
  }

  // logout patients
  async logout(req, res) {
    res.cookie("myToken", "", {
      httpOnly: true,
      // expiresIn: 0,
      maxAge: new Date(0),
    });

    return res.status(200).send({
      success: true,
      message: "User successfully logged out"
    });
  }

  //find all users
  async findPatients(req, res) {
    const patients = await PatientService.findPatients();
    res.status(200).send({
      success: true,
      message: "All users successfully retrieved",
      patients,
    });
  }
}

export default new PatientController();
