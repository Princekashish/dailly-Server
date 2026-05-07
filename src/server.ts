import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connnectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}`
    );
    console.log(
      `DB is connnected !! DB HOST: ${connnectionInstance.connection.host} `
    );
  } catch (error) {
    console.log("Mongoose Connect is error ", error);
    process.exit(1);
  }
};

export default connectDB;
