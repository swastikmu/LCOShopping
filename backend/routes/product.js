const express = require("express");
const router = express();

const { getCategoryById, getCategory } = require("../controllers/category");
const {
  getProductById,
  createProduct,
  getProduct,
  photo,
  removeProduct,
  updateProduct,
  getAllProducts,
  getAllUniqueCategories,
} = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);
router.param("productId", getProductById);

router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

router.get("/product/:productId", isSignedIn, isAuthenticated, getProduct);
router.get("/product/photo/:productId", photo);

//update a product
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);
//delete a product
router.delete(
  "/product/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeProduct
);

router.get("/products", getAllProducts);

router.get("/products/categories", getAllUniqueCategories);

module.exports = router;
