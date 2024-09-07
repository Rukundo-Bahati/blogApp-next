import mongoose from "mongoose";
const connectToDb = async () => {
  const connectionUrl = "mongodb+srv://blog:blog123@blog.1y8ua.mongodb.net/";

  mongoose
    .connect(connectionUrl)
    .then(() => console.log("blog db connection is sucessfull"))
    .catch((err) => console.log("Connection failed", err));
};

export default connectToDb