const express = require("express");
const router = express.Router();
const db = require("../database/pg");

router.get("/", async (req, res) => {
  const { rows } = await db.query("SELECT * FROM goal");
  res.json(rows.map((goal) => goal.name));
});

router.post("/", async (req, res) => {
  await db.query(`INSERT INTO goal (name) VALUES ('${req.body.name}')`);
  console.log(req.body.name);
  res.send(req.body.name);
});

module.exports = router;
