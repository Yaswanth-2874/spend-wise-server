import mongoose from "mongoose";

const establishMongoConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected to database");
  } catch (error) {
    console.log("Failed to connect to database due to ", error);
  }
};
export default establishMongoConnection;
