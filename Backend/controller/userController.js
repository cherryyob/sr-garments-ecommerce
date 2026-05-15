const { json } = require("body-parser");
const bagModel = require("../models/bag");
const homeModel = require("../models/homes");

exports.home = (req, res, next) => {
  homeModel.find().then((row) => {
    const items = row;
    res.send({ items });
  });
};
exports.getProductDetails = async (req, res, next) => {
  const { id } = req.body;
  const productDaatataById = await homeModel.findOne({ idName: id });
  if (productDaatataById) {
    console.log(productDaatataById, "this is receved");
    res.status(200).json(productDaatataById);
  }
};
exports.addToBag = (req, res, next) => {
  const { id } = req.body;
  console.log("idddd", id);
  const bag = new bagModel({ bagId: id });
  bag
    .save()
    .then(() => {
      bagModel.find().then((data) => {
        console.log("rsl : ", data);
        res.status(200).json(data);
      });
    })
    .catch((err) => {
      console.log("error while saving in bag module : ", err);
    });
};
exports.getBag = (req, res, next) => {
  bagModel.find().then((data) => {
    res.status(200).json(data);
  });
};
exports.removeItemById = async (req, res, next) => {
  const { id } = req.body;
  await bagModel.deleteOne({ bagId: id });
  bagModel.find().then((allData) => {
    res.status(200).json(allData);
  });
};
exports.bagItemFindInItems = (req, res, next) => {
  homeModel.find().then((items) => {
    bagModel.find().then((bagItem) => {
      const cartFulData = bagItem.map((bagSingleId) => {
        return items.find(
          (singleItem) => singleItem.idName === bagSingleId.bagId,
        );

        console.log(cartFulData, " :bagData");
      });
      res.status(200).json(cartFulData);
      console.log(bagItem, "bag item");
    });
  });
};
