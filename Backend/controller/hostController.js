const itemMdel = require("../models/homes");

exports.getAddProduct = (req, res, next) => {
  res.render("getProduct");
};
exports.postAddItemToDataBase = (req, res, next) => {
  const {
    company,
    item_name,
    image,
    original_price,
    current_price,
    discount_percentage,
    delivery_date,
    return_period,
    stars,
    count,
  } = req.body;
  console.log("hihih", req.body);
  const newItem = new itemMdel({
    company,
    item_name,
    image,
    original_price,
    current_price,
    discount_percentage,
    delivery_date,
    return_period,
    stars,
    count,
  });
  newItem.save().then((rsl) => {
    res.status(200).render("getProduct");
  });
};
