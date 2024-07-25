import mongoose from "mongoose";

function connectToMongodb() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Mongodb is running");
    })
    .catch(() => {
      console.log("Error detected");
    });
}

export default connectToMongodb;
