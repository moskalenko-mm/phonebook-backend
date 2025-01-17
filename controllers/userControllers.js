const gravatar = require("gravatar");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs/promises");

const User = require("../db/models/userModel");

const { SECRET_KEY } = process.env;

const signupController = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(409).json({ message: "Email in use" });
    return;
  }
  const avatar = gravatar.url(email);

  const newUser = new User({
    name,
    email,
    password,
    avatar,
  });

  await newUser.hashPassword(password);

  await newUser.save();

  const payload = {
    id: newUser._id,
  };

  const token = jwt.sign(payload, SECRET_KEY);

  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({ user: { name, email, avatar }, token });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(401).json({ message: "Email or password is wrong" });
    return;
  }

  const validPassword = await user.comparePassword(password);

  if (!validPassword) {
    res.status(401).json({ message: "Email or password is wrong" });
    return;
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY);

  await User.findByIdAndUpdate(user._id, { token });

  res.json({ user: { name: user.name, email, avatar: user.avatar }, token });
};

const logOutController = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};

const currentUserController = async (req, res) => {
  const { name, email, avatar } = req.user;

  res.json({
    name,
    email,
    avatar,
  });
};

const updateAvatar = async (req, res) => {
  console.log(req.file);
  const { path: oldPath, originalname } = req.file;
  const { _id } = req.user;
  const uniqName = `${_id}_${originalname}`;
  const avatarPath = path.join(__dirname, "../", "public", "avatars");
  const newPath = path.join(avatarPath, uniqName);
  await fs.rename(oldPath, newPath);
  const avatarURL = path.join("avatars", uniqName);

  await User.findByIdAndUpdate(_id, { avatar: avatarURL });
  res.json({ avatarURL });
};

module.exports = {
  signupController,
  loginController,
  logOutController,
  currentUserController,
  updateAvatar,
};
