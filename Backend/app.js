const express = require("express");
const path = require("path");
const rootDir = require("./utils/pathUtil");
const userRouter = require("./routes/userRouter");
const hostRouter = require("./routes/hostRouter");
const authRouter = require("./routes/authRouter");
const app = express();
const session = require("express-session");
const MongodbStore = require("connect-mongodb-session")(session);

app.use(express.static(path.join(rootDir, "public")));
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const port = 3000;
const pass = "cherRy78";
const url = `mongodb://cherryyob:${pass}@ac-ejfildg-shard-00-00.gftiffm.mongodb.net:27017,ac-ejfildg-shard-00-01.gftiffm.mongodb.net:27017,ac-ejfildg-shard-00-02.gftiffm.mongodb.net:27017/store?ssl=true&replicaSet=atlas-inztl9-shard-0&authSource=admin&appName=compliteCoding`;

const store = new MongodbStore({
  uri: url,
  collection: "session",
});

app.use(session({
secret:"this is enrepted 857 bit kahan kon khaya he ajj nahi",
resave:false,
saveUninitialized:true,
store
}))

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
