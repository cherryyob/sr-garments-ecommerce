const authControler = require("../controller/authControler");
const express = require("express");
const authRouter = express.Router();
authRouter.post("/signup", authControler.postSinghUp);
authRouter.post("/logout", authControler.postLogout);
authRouter.post("/login", authControler.postLogin);

module.exports = authRouter;
