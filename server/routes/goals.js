const express = require("express");
const router = express.Router();
const db = require("../database/pg");

router.get("/", async (req, res) => {
  const { rows } = await db.query("SELECT * FROM goal");
  res.json(rows);
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  const { rows } = await db.query(
    `INSERT INTO goal (name) VALUES ('${name}') RETURNING *`
  );
  res.send(rows[0]);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { rows } = await db.query(`SELECT * FROM goal WHERE id='${id}'`);
  res.json(rows[0]);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { rows } = await db.query(`DELETE FROM goal WHERE id='${id}'`);
  res.send(rows[0]);
});

router.put("/:id", async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const { rows } = await db.query(
    `UPDATE goal SET name='${name}' WHERE id='${id}' RETURNING *`
  );
  res.send(rows[0]);
});

module.exports = router;
