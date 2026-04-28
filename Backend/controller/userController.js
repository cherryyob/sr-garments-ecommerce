const homeModel = require("../models/homes");

exports.home = (req, res, next) => {
  homeModel.fatchAll((items) => {
    res.send(items);
    console.log(items);
  });
};
