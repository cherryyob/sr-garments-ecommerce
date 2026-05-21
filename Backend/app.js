/// ====================== External Libraries ======================
const express = require("express");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const { default: mongoose } = require("mongoose");
const MongodbStore = require("connect-mongodb-session")(session);

/// ====================== Internal Files ======================
const rootDir = require("./utils/pathUtil");
const userRouter = require("./routes/userRouter");
const hostRouter = require("./routes/hostRouter");
const authRouter = require("./routes/authRouter");

/// ====================== App Config ======================
const app = express();
const port = 3000;

/// ====================== Database ======================
const pass = "cherRy78";

const url = `mongodb://cherryyob:${pass}@ac-ejfildg-shard-00-00.gftiffm.mongodb.net:27017,ac-ejfildg-shard-00-01.gftiffm.mongodb.net:27017,ac-ejfildg-shard-00-02.gftiffm.mongodb.net:27017/store?ssl=true&replicaSet=atlas-inztl9-shard-0&authSource=admin&appName=compliteCoding`;

/// ====================== Session Store ======================
const store = new MongodbStore({
  uri: url,
  collection: "session",
});

/// ====================== Middlewares ======================
app.use(express.static(path.join(rootDir, "public")));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "this is enrepted 857 bit kahan kon khaya he ajj nahi",
    resave: false,
    saveUninitialized: false,
    store,
  }),
);

/// ====================== View Engine ======================
app.set("view engine", "ejs");
app.set("views", "views");

/// ====================== Routes ======================
app.use(userRouter);
app.use(authRouter);
app.use("/host", hostRouter);

/// ====================== Server ======================
mongoose.connect(url).then((rsl) => {
  app.listen(port, () => {
    console.log(port, " running on ");
  });
});
