const { json } = require("body-parser");
const bagModel = require("../models/bag");
const homeModel = require("../models/homes");
const userModel = require("../models/user");
const mongoose = require("mongoose");

exports.home = (req, res, next) => {
  homeModel.find().then((row) => {
    const items = row;

    res.send({
      items,
      user: req.session.user,
      isLogin: req.session.isLogedIn || false,
    });
  });
};
exports.getProductDetails = async (req, res, next) => {
  const { id } = req.body;
  const productDaatataById = await homeModel.findOne({ idName: id });
  if (productDaatataById) {
    res.status(200).json(productDaatataById);
  }
};
exports.addToBag = async (req, res, next) => {
  const userId = req.session.user.id;
  const { id } = req.body;
  const objectUser = new mongoose.Types.ObjectId(userId);

  const userDocument = await userModel.findByIdAndUpdate(
    { _id: objectUser },
    {
      $addToSet: { userData: { cart: id } },
      new: true,
    },
  );

  const bag = new bagModel({ bagId: id });
  bag
    .save()
    .then(() => {
      bagModel.find().then((data) => {
        res.status(200).json(data);
      });
    })
    .catch((err) => {
      console.log("error while saving in bag module : ", err);
    });
};
exports.getBag = async (req, res, next) => {
  const userId = req.session.user?.id || null;

  if (userId) {
    const mongooseId = new mongoose.Types.ObjectId(userId);
    const userDetails = await userModel.findById(mongooseId, "userData.cart");
    const cartValue = userDetails.userData?.cart;

    return res.status(200).json(cartValue);
  }
  return res.status(200);
};
exports.removeItemById = async (req, res, next) => {
  const userId = req.session.user?.id || null;
  const monguseId = new mongoose.Types.ObjectId(userId);
  const updatedUser = await userModel.findOneAndUpdate(
    { _id: convertToObjectId(userId) },
    { $pull: { userData: { cart: req.body.id } } },
    { new: true },
  );
  console.log("updatedUser", updatedUser);
  res.status(200).json(updatedUser.userData);
};
exports.bagItemFindInItems = async (req, res, next) => {
  const userCartData = await userModel.findById(
    req.session.user.id,
    "userData.cart",
  );
  const cartValue = userCartData.userData?.cart || [];
  const objectCartValue = await homeModel.find({ idName: { $in: cartValue } });

  if (objectCartValue) {
    res.status(200).json(objectCartValue);
  } else {
    res.status(200).json({ err: "looks cart is empty" });
  }
};
const convertToObjectId = (id) => {
  try {
    return new mongoose.Types.ObjectId(id);
  } catch (error) {
    console.error("Invalid ID format:", error);
    return null;
  }
};
