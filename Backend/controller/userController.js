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
  const cartFulData = [];
  homeModel.fatchAll((items) => {
    items.map((item) => {
      bagModel.fetchAllBag().then((allBagData) => {
        cartFulData.push(allBagData.filter((id) => items.id === id));
        console.log(cartFulData);
        res.status(200).json(cartFulData);
      });
    });
  });
};
