const express = require("express");
const router = express.Router();
const db = require("../database/pg");

router.get("/", async (req, res) => {
  const { rows } = await db.query("SELECT * FROM principle");
  res.json(rows.map((principle) => principle.name));
});

module.exports = router;
