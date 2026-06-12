const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/userController");

userRouter.get("/items", userController.home);
userRouter.post("/bag", userController.addToBag);
userRouter.get("/bag", userController.getBag);
userRouter.post("/removeItemById", userController.removeItemById);
userRouter.get("/bagItemFindInItems", userController.bagItemFindInItems);
userRouter.post("/getProductDetails", userController.getProductDetails);
// ADDRESS ROUTES
userRouter.post("/removeAddress", userController.removeAddress);
userRouter.post("/userAddress", userController.postAddress);
userRouter.get("/getAddress", userController.getAddress);
// WISHLIST ROUTES
userRouter.post("/addWishlist", userController.addWishlist);
userRouter.get("/getWishlist", userController.getWishlist);
userRouter.post("/removeWishlist", userController.removeWishList);

module.exports = userRouter;
