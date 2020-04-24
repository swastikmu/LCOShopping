const express = require("express");
const router = express();

const { getAllUsers } = require("../controllers/getAllUsers");

router.get("/users", getAllUsers);

module.exports = router;
