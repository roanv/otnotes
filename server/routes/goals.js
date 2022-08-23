const express = require("express");
const router = express.Router();
const db = require("../database/pg");

router.get("/", async (req, res) => {
  const { rows } = await db.query("SELECT * FROM goal");
  res.json(rows);
});

router.post("/", async (req, res) => {
  const { id } = req.body;
  await db.query(`INSERT INTO goal (name) VALUES ('${id}')`);
  res.send(id);
});

router.get("/:id", async (req, res) => {
  const { rows } = await db.query(
    `SELECT * FROM goal WHERE name='${req.params.id}'`
  );
  res.json(rows);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await db.query(`DELETE FROM goal WHERE name='${req.params.id}'`);
  res.send(id);
});

module.exports = router;
