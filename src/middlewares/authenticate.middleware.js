import jwt from "jsonwebtoken";
import UserService from "../services/user.service.js";

async function authenticate(req, res, next) {
  //get user cookie
  const token = await req.cookies.myToken;

  //if no cookie
  if (!token) {
    return res.status(401).send({
      success: false,
      message: "No token found, please log in",
    });
  }

  //find the cookie
  //decrypt the cookie
  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    //if error (expired cookie?)
    if (err) {
      return res.status(401).send({
        success: false,
        message: "Invalid token, please log in",
      });
    }

    //with the email, find the user in the database
    const user = await UserService.findUser({ email: decoded.email });
    //if user does not exist (deleted user?)
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Invalid email, please sign in",
      });
    }
    //find user using req.user
    req.user = user;
    next();
  });

}

export default authenticate;
