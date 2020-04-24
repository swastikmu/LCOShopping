var express = require("express");
const { check, validationResult } = require("express-validator");
var router = express.Router();
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name")
      .isLength({ min: 5 })
      .withMessage("name at least 5 characters"),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("Email id required"),
    check("password").isLength({ min: 3 }).withMessage("password is required"),
  ],
  signin
);

router.get("/signout", signout); //write the error message in sign out method which is in controller

router.get("/protectedroute", isSignedIn, (req, res) => {
  res.send("this is a protected route");
});

module.exports = router;
