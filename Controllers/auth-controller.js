const bcrypt = require("bcrypt");
const User = require("../db/User");

const home = async (req, res) => {
  try {
    res.status(200).send("Home");
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      res.send("user already exist");
      console.log("user already exist");
    }

    const userCreated = await User.create({ email, password });

    res.json({
      msg: userCreated,
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.log(error, "auth controller");
  }
};

const profile = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      res.send("user already exist");
      console.log("user already exist");
    }

    const userCreated = await User.create({ email, password });

    res.json({
      msg: userCreated,
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.log(error, "auth controller");
  }
};

const post = async (req, res) => {
  try {
    const user = await User.findOne(
      { _id: req.params.id }
    );
    const { title, photo } = req.body;
    user.post.push({ title, photo });
    await user.save();
    res.send(user);
  } catch (error) {
    console.log(error);
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    console.log(userExist);
    if (!userExist) {
      return res.status(400).send("Invalid Credential");
    }

    const userCreated = await bcrypt.compare(password, userExist.password);
    res.json({
      msg: userExist,
      token: await userExist.generateToken(),
      userId: userExist._id.toString(),
    });
    if (userCreated) {
      res.send("login Succesfully...");
    } else {
      res.status(401).send("Invalid Email or Password");
    }
  } catch (error) {
    console.log(error, "auth controller");
  }
};

const getUsers = async (req, res) => {
  try {
    let users = await User.find();
    res.send(users);
  } catch (error) {
    console.log(error, "auth controller");
  }
};
const getUser = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email: email });
    res.send(user);
  } catch (error) {
    console.log(error);
  }
};
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await User.deleteOne({ _id: id });
    res.send(deletedUser);
  } catch (error) {
    console.log(error, "auth controller");
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.updateOne(
      { _id: req.params.id },
      {
        $set: req.body,
      },
      { new: true }
    ).select("-password");

    return res.status(200).json({ msg: "Update Succesfully...", user });
  } catch (error) {
    console.log(error, "auth controller");
  }
};

module.exports = {
  home,
  register,
  post,
  login,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
};
