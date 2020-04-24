const { User } = require("../models/users");
const { Order } = require("../models/order");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      res.status(400).json({
        error: "No user found in DB",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = function (req, res) {
  //come back for password
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;

  return res.json(req.profile);
};

exports.updateUser = function (req, res) {
  user = User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { useFindAndModify: false, new: true },
    (err, user) => {
      if (err || !user) {
        res.json({ error: "User not updated" });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      user.createdAt = undefined;
      user.updatedAt = undefined;
      return res.json(user);
    }
  );
};

exports.userPurchaseList = function (req, res) {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec(function (err, order) {
      if (err || !order) {
        res.json({ error: "No order in this account" });
      }
      return res.json(order);
    });
};

exports.pushOrderInPurchaseList = function (req, res, next) {
  let purchses = [];
  req.body.order.products.forEach(function (product) {
    purchses.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: product.amount,
      transaction_id: req.body.order.transaction_id,
    });
  });

  //store this in db
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true },
    (err, purchases) => {
      if (err || !purchases) {
        res.status(400).json({ error: "unable to save purchase list" });
      }
      next();
    }
  );
};
