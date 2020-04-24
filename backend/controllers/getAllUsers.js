const { User } = require("../models/users");

exports.getAllUsers = (req, res) => {
  User.find().exec((err, users) => {
    if (err && !users) {
      return res.json({ error: "No users are there in DB" });
    }
    res.json(users);
  });
};
