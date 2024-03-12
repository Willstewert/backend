const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/app");
    console.log("connection successfully to Dd");
  } catch (error) {
    console.log("Database not connection faild");
    process.exit(0);
  }
};
module.exports = connectDB;
