const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/", userController.createUser);

router.get("/", (req, res) => {
  res.send("Welcome to the Shopping Mall API");
});

module.exports = router;
