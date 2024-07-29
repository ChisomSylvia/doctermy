import express from "express";
const app = express();
import connectToMongodb from "./configs/db.config.js";
import indexMiddleware from "./middlewares/index.middleware.js";
const PORT = process.env.PORT || 1111;



console.log("hello");
indexMiddleware(app);



app.listen(PORT, () => {
  connectToMongodb();
  console.log(`App is currently running on port ${PORT}`);
})