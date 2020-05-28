const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");

const fs = require("fs");

exports.getProductById = function (req, res, next, id) {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err || !product) {
        return res.status(400).json({ error: "Product is not found" });
      }
      req.product = product;
      next();
    });
};

exports.createProduct = function (req, res) {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, function (err, fields, file) {
    if (err) {
      res.status(400).json({
        error: "problem with image",
      });
    }
    //come back restriction on field

    const { description, name, price, stock, category } = fields;

    if (!name || !price || !stock || !description || !category) {
      return res.status(400).json({ error: "please include all fields" });
    }

    let product = new Product(fields);

    //handle files
    if (file.photo) {
      if (file.photo.size > 1024 * 1024 * 3) {
        res.status(400).json({
          error: "image is too big",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    //save to DB
    product.save(function (err, product) {
      if (err || !product) {
        res.json({
          error: "saving image in DB failed",
        });
      }
      res.json(product);
    });
  });
};

exports.getProduct = function (req, res) {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.photo = function (req, res, next) {
  if (req.product.photo.data) {
    req.set("content-type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};
 
exports.removeProduct = function (req, res) {
  let product = req.product;
console.log(product);
  product.remove(function (err, product) {
    if (err || !product) {
      return res.status(400).json({ error: "falied to delete" });
    }
    return res.json({
     message: "Deletion was a success"
    });
  })
};

exports.updateProduct = function (req, res) {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, function (err, fields, file) {
    if (err) {
      res.status(400).json({
        error: "problem with image",
      });
    }

    let product = req.product;
    product = _.extend(product, fields);
    //handle files
    if (file.photo) {
      if (file.photo.size > 1024 * 1024 * 3) {
        res.status(400).json({
          error: "image is too big",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    //save to DB
    product.save(function (err, product) {
      if (err || !product) {
        res.json({
          error: "updation image in DB failed",
        });
      }
      res.json(product);
    });
  });
};

exports.getAllProducts = function (req, res) {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Product.find()
    .select("-photo")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec(function (err, products) {
      if (err || !products) {
        res.json({ error: "No products is found" });
      }
      res.json(products);
    });
};
exports.updateStock = function (req, res, next) {
  let myOperations = req.body.order.products.map(function (prod) {
    return {
      updateOne: {
        filter: { _id: prod._id },
        // If you were using the MongoDB driver directly, you'd need to do
        // `update: { $set: { title: ... } }` but mongoose adds $set for
        // you.
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });
  Product.bulkWrite(myOperations, {}, (err, products) => {
    if (err || !products) {
      res.json({ error: "Bulk operation failed" });
    }
    next();
  });
};

exports.getAllUniqueCategories = function (req, res) {
  product.distinct("category", {}, (err, category) => {
    if (err || !category) {
      return res.json({
        error: "no category found",
      });
    }
    res.json(category);
  });
};
