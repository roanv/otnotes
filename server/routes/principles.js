const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.json([
    "Weight shift",
    "Elongation",
    "Rotation",
    "Narrow base of support",
    "Elevate point of gravity",
    "Decrease external support",
    "Increase external resistance",
    "Open & closed eyes",
  ]);
});

module.exports = router;
