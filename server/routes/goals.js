const express = require("express");
const router = express.Router();
const db = require("../database/pg");

router.get("/", async (req, res) => {
  const { rows } = await db.query("SELECT * FROM goal");
  res.json(rows.map((goal) => goal.name));
});

// [
//   "Balance",
//   "Ocular Control",
//   "Bilateral Integration",
//   "Fine Motor Control",
//   "Visual Perception",
// ];

module.exports = router;
