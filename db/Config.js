const mongoose = require("mongoose");
const connectDb = async () => {
  try {
    await mongoose.connect(`mongodb://127.0.0.1:27017/app`);
    console.log("connection successfully to database");
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};

module.exports = connectDb;
