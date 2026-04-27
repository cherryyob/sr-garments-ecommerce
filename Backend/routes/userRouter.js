const express=require("express");
const userRouter=express.Router();
const userController=require("../controller/userController")
userRouter.get("/",userController.home)

module.exports=userRouter;
