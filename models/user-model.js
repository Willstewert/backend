const mongoose = require("mongoose");

const userSchema = new mongoose.Schema ({
  email: {
    type: "String",
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: "String",
    required: true,
    unique: true,
    lowercase: true,
  },
});

const User = new mongoose.model("User", userSchema);
