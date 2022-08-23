const express = require("express");
const router = express.Router();
const db = require("../database/pg");

router.get("/:id", async (req, res) => {
  const { rows } = await db.query(
    `SELECT * FROM goal WHERE name='${req.params.id}'`
  );
  res.json(rows);
});

router.get("/", async (req, res) => {
  const { rows } = await db.query("SELECT * FROM goal");
  res.json(rows);
});

router.post("/", async (req, res) => {
  await db.query(`INSERT INTO goal (name) VALUES ('${req.body.name}')`);
  res.send(req.body.name);
});

module.exports = router;
