const { json } = require("body-parser");
const bagModel = require("../models/bag");
const homeModel = require("../models/homes");
const userModel = require("../models/user");
const mongoose = require("mongoose");
const { ReturnDocument } = require("mongodb");

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
// Address api
exports.removeAddress = async (req, res, next) => {
  const { index } = req.body;
  const userId = new mongoose.Types.ObjectId(req.session.user?.id || null);
  const user = await userModel.findById(userId);
  user.userData.Addresses.splice(index, 1);
  await user.save();
  return res.status(200).json({
    message: "Addresses fetched successfully",
    data: user.userData.Addresses,
  });
};
exports.getAddress = async (req, res, next) => {
  const userId = new mongoose.Types.ObjectId(req.session.user?.id || null);
  try {
    const addressData = await userModel.findById(userId, "userData.Addresses");
    console.log("Fetched addresses:", addressData);
    if (addressData && addressData.userData) {
      console.log("adsdsdsd", addressData.userData.Addresses);
      const fetchAddress = Array.isArray(addressData.userData.Addresses)
        ? addressData.userData.Addresses
        : addressData.userData.Addresses
          ? [addressData.userData.Addresses]
          : [];

      return res.status(200).json({
        message: "Addresses fetched successfully",
        data: fetchAddress,
      });
    } else {
      return res.status(404).json({ message: "Addresses not found", data: [] });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error", data: [] });
  }
};
exports.postAddress = async (req, res, next) => {
  const addrssData = req.body;
  const addressSave = await userModel.findByIdAndUpdate(
    { _id: new mongoose.Types.ObjectId(req.session.user.id) },
    { $push: { "userData.Addresses": addrssData } },
    { new: true },
  );

  if (addressSave) {
    res.status(200).json({ message: "Address saved successfully" });
  } else {
    res.status(500).json({ message: "Failed to save address" });
  }
};

exports.getProductDetails = async (req, res, next) => {
  const { id } = req.body;
  const productDaatataById = await homeModel.findOne({ idName: id });
  if (productDaatataById) {
    res.status(200).json(productDaatataById);
  }
};
// CART API
exports.addToBag = async (req, res, next) => {
  console.log(req.session, "hihih");
  const userId = req.session.user.id;
  const { id } = req.body;

  const objectUser = new mongoose.Types.ObjectId(userId);

  const userDocument = await userModel.findByIdAndUpdate(
    { _id: objectUser },
    {
      $addToSet: { "userData.cart": id },
    },
    { new: true },
  );

  if (userDocument) {
    return res.status(200).json(userDocument.userData.cart);
  }
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
    { $pull: { "userData.cart": req.body.id } },
    { new: true },
  );
  console.log("updatedUser", updatedUser);
  res.status(200).json(updatedUser.userData.cart);
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

//wishlist

exports.addWishlist = async (req, res, next) => {
  const { id } = req.body;
  const userId = new mongoose.Types.ObjectId(req.session.user?.id ?? null);
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ succes: false, message: "User not found" });
    }

    const isDuplicate = user.userData.wishlist.includes(id);

    if (isDuplicate) {
      return res.status(200).json({
        succes: false,
        message: "Already In your wishList",
        data: user.userData.wishlist, // Send back current list
      });
    }

    const response = await userModel.findByIdAndUpdate(
      userId,
      { $addToSet: { "userData.wishlist": id } },
      { returnDocument: "after" },
    );
    return res.status(200).json({
      succes: true,
      message: "Added to wishList",
      data: response.userData.wishlist,
    });
  } catch (err) {
    return res.status(200).json({
      succes: false,
      message: "Network Issue",
    });
  }
};

exports.getWishlist = async (req, res, next) => {
  const userId = new mongoose.Types.ObjectId(req.session.user?.id ?? null);
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ succes: false, message: "User not found" });
    }

    return res.status(200).json({
      succes: true,
      message: "User found",
      data: user.userData.wishlist,
    });
  } catch (err) {}
};
exports.removeWishList = async (req, res, next) => {
  const { id } = req.body;
  const objectUserID = new mongoose.Types.ObjectId(req.session?.user?.id);
  if (!objectUserID || !id) {
    return res
      .status(400)
      .json({ succes: false, message: "User ID or Product ID missing" });
  }

  const response = await userModel.findByIdAndUpdate(
    objectUserID,
    {
      $pull: { "userData.wishlist": id },
    },
    { returnDocument: "after" },
  );
  console.log(response);
  if (!response) {
    return res
      .status(400)
      .json({ succes: false, message: "error while removing from wishList" });
  }
  return res.status(200).json({
    succes: true,
    message: "Removed from wishlist",
    data: response.userData?.wishlist || [],
  });
};

//local ues perppuse
const convertToObjectId = (id) => {
  try {
    return new mongoose.Types.ObjectId(id);
  } catch (error) {
    console.error("Invalid ID format:", error);
    return null;
  }
};
