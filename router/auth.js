const express = require("express");
const router = new express.Router();
const authenticate = require("../middleware/auth");

router.get("/checkToken", authenticate, async (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
