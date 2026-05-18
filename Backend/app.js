const express = require("express");
const path = require("path");
const rootDir = require("./utils/pathUtil");
const userRouter = require("./routes/userRouter");
const hostRouter = require("./routes/hostRouter");
const authRouter = require("./routes/authRouter");
const app = express();
app.use(express.static(path.join(rootDir, "public")));
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const port = 3000;
const pass = "cherRy78";
const url = `mongodb://cherryyob:${pass}@ac-ejfildg-shard-00-00.gftiffm.mongodb.net:27017,ac-ejfildg-shard-00-01.gftiffm.mongodb.net:27017,ac-ejfildg-shard-00-02.gftiffm.mongodb.net:27017/store?ssl=true&replicaSet=atlas-inztl9-shard-0&authSource=admin&appName=compliteCoding`;
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.urlencoded());
app.use(userRouter);
app.use(authRouter);
app.use("/host", hostRouter);
mongoose.connect(url).then((rsl) => {
  app.listen(port, () => {
    console.log(port, " running on ");
  });
});
