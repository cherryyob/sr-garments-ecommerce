const bagModel = require("../models/bag");
const homeModel = require("../models/homes");

exports.home = (req, res, next) => {
  homeModel.fatchAll((items) => {
    res.send(items);
  });
};
exports.addToBag = (req, res, next) => {
  const { id } = req.body;
  const bag = new bagModel(id);
  bag.save().then((rsl) => {
    res.status(200).json(rsl);
  });
};
exports.getBag = (req, res, next) => {
  bagModel.fetchAllBag().then((data) => {
    res.status(200).json(data.length);
  });
};
