const Category = require("../models/Category");

exports.getCategoryById = function (req, res, next, id) {
  Category.findById(id).exec(function (err, category) {
    if (err || !category) {
      return res.status(400).json({ error: "category not found in DB" });
    }
    req.category = category;
    next();
  });
};

exports.createCategory = function (req, res) {
  const category = new Category(req.body);

  category.save(function (err, category) {
    if (err) {
      res.json({ error: "not able to save in DB" });
    }
    res.json(category);
  });
};

exports.getCategory = function (req, res) {
  return res.json(req.category);
};

exports.getAllCategory = function (req, res) {
  Category.find().exec(function (err, categories) {
    if (err || !categories) {
      res.json({ error: "No Category is found" });
    }
    res.json(categories);
  });
};

exports.updateCategory = function (req, res) {
  const category = req.category;
  category.name = req.body.name;

  category.save(function (err, category) {
    if (err || !category) {
      return res.status(400).json({ error: "falied to update" });
    }
    res.json(category);
  });
};

exports.removeCategory = function (req, res) {
  const category = req.category;

  category.remove(function (err, category) {
    if (err || !category) {
      return res.status(400).json({ error: "falied to delete" });
    }
    res.json({ message: `${category.name} deleted successfully` });
  });
};
