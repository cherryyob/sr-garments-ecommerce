const express = require("express");
const userRouter = express.Router();

const userController = require("../controller/userController");
userRouter.get("/items", userController.home);
userRouter.post("/bag", userController.addToBag);
userRouter.get("/bag", userController.getBag);

module.exports = userRouter;
