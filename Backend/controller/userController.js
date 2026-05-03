const bagModel = require("../models/bag");
const homeModel = require("../models/homes");

exports.home = (req, res, next) => {
  homeModel.fatchAll((items) => {
    res.send(items);
  });
};
exports.addToBag = (req, res, next) => {
  const { id } = req.body;
  res.status(200).json({ mess: "added to bag", recevedId: id });
  const bag = new bagModel(id);
  bag.save().then((rsl) => {
    //console.log(rsl);
  });

  console.log(req.body);
};
