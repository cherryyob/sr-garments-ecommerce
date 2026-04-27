const express=require("express");
const userRouter=require("./routes/userRouter");
const app=express();
app.use(express.urlencoded());
app.use(userRouter);
const port =3000;
app.listen(port,()=>{
  console.log(port," running on ")
})
