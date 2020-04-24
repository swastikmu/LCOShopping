const { Order, ProductCart } = require("../models/order");

exports.getOrderById = function (req, res, next, id) {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec(function (err, order) {
      if (err || !order) {
        return res.status(400).json({ error: "No order" });
      }
      req.order = order;
      next();
    });
};

exports.createOrder = function (req, res) {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);

  order.save(function (err, order) {
    if (err || !order) {
      return res.json({ error: "order not saved in db" });
    }
    res.json(order);
  });
};

exports.getAllOrders = function (req, res) {
  Order.find()
    .populate("user", "_id name ")
    .exec(function (err, order) {
      if (err || !order) {
        return res.status(400).json({ error: "no order found in DB" });
      }
      res.json(order);
    });
};

exports.getOrderStatus = function (req, res) {
  res.json(order.schema.path("status").enumValues);
};

exports.updateStatus = function (req, res) {
  Order.update(
    { _id: req.body._id },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err || !order) {
        return res.status(400).json({ error: "unable to update order" });
      }
      res.json(order);
    }
  );
};
