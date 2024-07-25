import mongoose from "mongoose";

function connectToMongodb() {
  mongoose
    .connect(
      "mongodb+srv://chisomsylvia95:September95@cluster0.eaosxk0.mongodb.net"
    )
    .then(() => {
      console.log("Mongodb is running");
    })
    .catch(() => {
      console.log("Error detected");
    });
}

export default connectToMongodb;
