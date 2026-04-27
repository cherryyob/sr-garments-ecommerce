const homeModel=require("../models/homes");

exports.home=(req,res,next)=>{
  const home=new homeModel(1,"Gangesh",1000,5.0,"gangeshImage","this is a great productr");
  home.save();
  console.log("userController");
}