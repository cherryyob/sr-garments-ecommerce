const express = require("express");
const userRouter = require("./routes/userRouter");
const app = express();

const cors = require("cors");
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.urlencoded());
app.use(userRouter);
const port = 3000;
app.listen(port, () => {
  console.log(port, " running on ");
});
