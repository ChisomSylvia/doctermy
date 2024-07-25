import jwt from "jsonwebtoken";
import PatientService from "../services/patient.service.js";

async function authenticate(req, res, next) {
  //get user cookie
  const token = await req.cookies.token;

  //if no cookie
  if (!token) {
    return res.status(401).send({
      success: false,
      message: "No token found, please log in",
    });
  }

  //find the cookie
  //decrypt the cookie
  jwt.verify(token, "mySecret", async (err, decoded) => {
    //if error (expired cookie?)
    if (err) {
      return res.status(401).send({
        success: false,
        message: "invalid token, please log in",
      });
    }

    //with the email, find the user in the database
    const user = await PatientService.findOne({ email: decoded.email });
    //if user does not exist (deleted user?)
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Invalid email, please sign in",
      });
    }
    //find user
    req.user = user;
    next();
  });

}

export default authenticate;
