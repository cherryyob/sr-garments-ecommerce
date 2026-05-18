const authControler = require("../controller/authControler");
const express = require("express");
const authRouter = express.Router();
authRouter.post("/signup", authControler.postSinghUp);
authRouter.get("/signup", authControler.getSinghUp);

module.exports = authRouter;
