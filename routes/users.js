const express = require("express");

const userRouter = express.Router();

const {
  signupController,
  loginController,
  logOutController,
  currentUserController,
  updateAvatar,
} = require("../controllers/userControllers");

const upload = require("../middlewares/upload");
const isValidFile = require("../middlewares/isValidFile");

const {
  signupSchema,
  loginSchema,
  validateUser,
} = require("../middlewares/validateUser");

const authenticate = require("../middlewares/authenticate");

userRouter.post("/signup", validateUser(signupSchema), signupController);

userRouter.post("/login", validateUser(loginSchema), loginController);

userRouter.post("/logout", authenticate, logOutController);

userRouter.get("/current", authenticate, currentUserController);

userRouter.patch(
  "/avatar",
  authenticate,
  upload.single("avatar"),
  isValidFile,
  updateAvatar
);

module.exports = userRouter;
