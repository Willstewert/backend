const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    photo: {
      type: String,
      default: "no post yet",
    },
  },
  { timestamps: true }
);
const likeSchema = new mongoose.Schema(
  {
    counter: {
      type: Number,
    },
  },
  { timestamps: true }
);
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      unique: true,
      required: true,
    },
    post: [postSchema],
    count: [likeSchema],
  },
  { timestamps: true }
);
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      "MERNSTACKPROJECT",
      { expiresIn: "30d" }
    );
  } catch (error) {
    console.log(error);
  }
};
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    next();
  }
  try {
    const saltRound = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, saltRound);
    user.password = hashPassword;
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", userSchema);
