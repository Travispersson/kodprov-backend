import "dotenv/config";
import mongoose from "mongoose";

let db;
const dbConnection = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/viaplay`;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(dbConnection, { useNewUrlParser: true }, () => {
      console.log("Successfully connected to database!");
    });
    return mongoose.connection;
  } catch (err) {
    console.log("Couldn't connect to database: ", err.message);
  }
};

export default connectToDatabase;
