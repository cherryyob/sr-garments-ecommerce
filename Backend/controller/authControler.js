const { check, validationResult } = require("express-validator");
const userModule = require("../models/user");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
exports.postSinghUp = [
  check("firstname")
    .trim()
    .isLength({ mim: 2 })
    .withMessage("minimum 2 charecor neeed in first name")
    .matches(/^[a-zA-Z\s]*$/)
    .withMessage("first name only use alphabet"),
  check("lastname")
    .trim()
    .matches(/^[a-zA-Z\s]*$/)
    .withMessage("last name only use alphabet"),
  check("email").isEmail().withMessage("enter valid email").normalizeEmail(),
  check("password")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 charactor")
    .matches(/[a-z]/)
    .withMessage("password should containt one lowercase")
    .matches(/[A-Z]/)
    .withMessage("password should containt one uppercase")
    .matches(/[0-9]/)
    .withMessage("password should containt one number")
    .matches(/[!@#$%^&*_+?><]/)
    .withMessage("password should containt one special charactor")
    .trim(),
  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password and confirmPassword do not matche");
      }
      return true;
    }),
  check("role")
    .notEmpty()
    .withMessage("userType must needed")
    .isIn(["guest", "host"])
    .withMessage("user type invalid"),
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      console.log(req.body, "and error is :", error);
      return res.status(200).json({ err: error.array()[0].msg });
    } else {
      const { role, password, email, lastname, firstname } = req.body;

      const userData = new userModule({
        role,
        password,
        email,
        lastname,
      })
        .save()
        .then(() => {
          req.session.isLogedIn = false;
          console.log(email);
          res.status(200).json({ err: "data saved in backend" });
        })
        .catch((err) => {
          res.status(200).json({ err: err.message });
        });
    }
  },
];
exports.postLogout = (req, res, next) => {
  console.log(req.session, "hjkhjk");
  req.session.destroy((err) => {
    req.session.isLogedIn = false;
    console.log(req.session, "hjkhjk");
    if (err) {
      return res.status(500).json({
        message: "Logout failed",
      });
    }

    res.clearCookie("connect.sid");

    res.status(200).json({
      message: "Logout done",
    });
  });
};
exports.postLogin = async (req, res, next) => {
  const userlFind = await user.findOne({ email: req.body.email });
  if (userlFind !== null && userlFind.email[0] === req.body.email) {
    req.session.isLogedIn = true;
    req.session.save((err) => {
      if (err) {
        console.log("error while session sving ", err);
      }
    });
    const token = jwt.sign(
      {
        userid: userlFind,
        email: userlFind.email,
      },
      "this%%is g and i am ggok he 545656uye88789@#@#",
      { expiresIn: "7d" },
    );
    res
      .status(200)
      .json({ status: true, sms: "succsesfully log in", token, userlFind });
  } else {
    req.session.isLogedIn = false;
    res.status(200).json({ status: false, sms: "check your email" });
  }
};
