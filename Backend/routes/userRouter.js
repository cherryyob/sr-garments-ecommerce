const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/userController");

userRouter.get("/items", userController.home);
userRouter.post("/bag", userController.addToBag);
userRouter.get("/bag", userController.getBag);
userRouter.post("/removeItemById", userController.removeItemById);
userRouter.get("/bagItemFindInItems", userController.bagItemFindInItems);
userRouter.post("/getProductDetails", userController.getProductDetails);
userRouter.post("/userAddress", userController.postAddress);
userRouter.get("/getAddress", userController.getAddress);
userRouter.post("/addWishlist",userController.addWishlist);
userRouter.get("/getWishlist",userController.getWishlist);
userRouter.post("/removeWishlist",userController.removeWishlist);

module.exports = userRouter;
