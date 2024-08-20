

// const checkUserType = (allowedUserTypes) => {
//   return (req, res, next) => {
//     const user = req.user;
//     if (allowedUserTypes.includes(user.userType)) {
//       next();
//     } else {
//       return res.status(403).send({
//         success: false,
//         message: "Unauthorized access"
//       })
//     }
//   }
// }

// export { checkUserType };


// const isSuperAdmin = (req, res, next) => {
//   const user = req.user;
//   if (user.userType === userTypes.SUPERADMIN) {
//     next();
//   } else {
//     return res.status(403).send({
//       success: false,
//       message: "Unauthorized access"
//     })
//   }
// }

// const isAdmin = (req, res, next) => {
//   const user = req.user;
//   if (user.userType === userTypes.ADMIN) {
//     next();
//   } else {
//     return res.status(403).send({
//       success: false,
//       message: "Unauthorized access"
//     })
//   }
// }

// export { isSuperAdmin, isAdmin }