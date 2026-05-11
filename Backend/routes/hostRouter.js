const hostController = require("../controller/hostController");
const express = require("express");
const hostRouter = express.Router();
hostRouter.get("/addProduct", hostController.getAddProduct);
hostRouter.post("/addItem", hostController.postAddItemToDataBase);

module.exports = hostRouter;
