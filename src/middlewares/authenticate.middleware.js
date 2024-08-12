import jwt from "jsonwebtoken";
import UserService from "../services/user.service.js";


const authenticate = (allowedUserTypes = []) => {
  return async (req, res, next) => {
    //get user token from cookie or authorized header
    let token = await req.cookies.myToken || req.headers.authorization;

    //if token is in the authorization header, remove the bearer prefix if present
    if (token && token.startsWith("Bearer ")) {
      token = token.slice(7, token.length)
    }

    //if no cookie
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "No token found, please log in",
      });
    }

    //found token? decrypt the token
    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
      //if error (expired cookie?)
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Invalid token, please log in",
        });
      }

      //with the email returned from the token, find the user in the database
      const user = await UserService.findUser({ email: decoded.email });
      //if user does not exist (deleted user?)
      if (!user) {
        return res.status(401).send({
          success: false,
          message: "Invalid email, please sign up",
        });
      }
      //attach user to the request object using req.user
      req.user = user;

      //check if user has the right role
      if (allowedUserTypes.length === 0 || allowedUserTypes.includes(user.role)) {
        next();
      } else {
        return res.status(403).send({
          success: false,
          message: "Unauthorized access",
        });
      }
    });
  };
};

export { authenticate };

// async function authenticate(req, res, next) {
//   //get user cookie
//   const token = await req.cookies.myToken;

//   //if no cookie
//   if (!token) {
//     return res.status(401).send({
//       success: false,
//       message: "No token found, please log in",
//     });
//   }

//   //find the cookie
//   //decrypt the cookie
//   jwt.verify(token, process.env.SECRET, async (err, decoded) => {
//     //if error (expired cookie?)
//     if (err) {
//       return res.status(401).send({
//         success: false,
//         message: "Invalid token, please log in",
//       });
//     }

//     //with the email, find the user in the database
//     const user = await UserService.findUser({ email: decoded.email });
//     //if user does not exist (deleted user?)
//     if (!user) {
//       return res.status(401).send({
//         success: false,
//         message: "Invalid email, please sign in",
//       });
//     }
//     //find user using req.user
//     req.user = user;
//     next();
//   });

// }
