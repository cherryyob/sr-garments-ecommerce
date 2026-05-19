const { check, validationResult } = require("express-validator");
const userModule = require("../models/user");
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
exports.getSinghUp = (req, res, next) => {
  res.send("singp pahge");
};
exports.postLogin = (req, res, next) => {
  console.log(req.body);
};
