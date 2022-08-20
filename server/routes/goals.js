const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.json([
    "Balance",
    "Ocular Control",
    "Bilateral Integration",
    "Fine Motor Control",
    "Visual Perception",
  ]);
});

module.exports = router;
