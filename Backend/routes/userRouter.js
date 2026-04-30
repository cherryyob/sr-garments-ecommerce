const express = require("express");
const userRouter = express.Router();

const userController = require("../controller/userController");
userRouter.get("/items", userController.home);

module.exports = userRouter;
