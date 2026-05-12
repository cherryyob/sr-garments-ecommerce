const { json } = require("body-parser");
const bagModel = require("../models/bag");
const homeModel = require("../models/homes");

exports.home = (req, res, next) => {
  homeModel.find().then((row) => {
    const items = row;
    res.send({ items });
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
    res.status(200).json(data);
  });
};
exports.removeItemById = (req, res, next) => {
  const { id } = req.body;
  bagModel.fetchAllBag().then((allData) => {
    allData = allData.filter((data) => data !== id);
    bagModel
      .saveAllToBag(allData)
      .then((dataUpdate) => res.status(200).json(dataUpdate));
  });
};
exports.bagItemFindInItems = (req, res, next) => {
  homeModel.find().then((items) => {
    bagModel.fetchAllBag().then((bagItem) => {
      const cartFulData = bagItem.map((bagSingleId) => {
        return items.find((singleItem) => singleItem.idName === bagSingleId);

        console.log(cartFulData, " :bagData");
      });
      res.status(200).json(cartFulData);
      console.log(bagItem, "bag item");
    });
  });
};
