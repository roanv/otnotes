const db = require("../database/pg");

const Table = "goal";

const Col = {
  Name: "name",
  ID: "id",
};

class DatabaseError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

exports.create = async function create(goal) {
  const query = `INSERT INTO ${Table} (${Col.Name}) VALUES ('${String(
    goal.name
  )}') RETURNING *`;
  return await run(query);
};

exports.find = async function find(goal) {
  let query = "SELECT * FROM goal";
  if (goal.id) query = `SELECT * FROM goal WHERE id='${goal.id}'`;
  return await run(query);
};

exports.update = async function update(goal) {
  await assertExists(Col.ID, goal.id);
  const query = `UPDATE goal SET ${Col.Name}='${goal.name}' WHERE ${Col.ID}='${goal.id}' RETURNING *`;
  return await run(query);
};

exports.remove = async function remove(goal) {
  await assertExists(Col.ID, goal.id);
  const query = `DELETE FROM ${Table} WHERE id='${goal.id}' RETURNING *`;
  return await run(query);
};

async function run(query) {
  const result = await db.query(query);
  return result.rows;
}

async function assertExists(key, value) {
  const query = `SELECT EXISTS(SELECT 1 FROM goal WHERE ${key}='${value}') AS EXISTS`;
  const result = await run(query);
  if (!result[0].exists) throw new DatabaseError("Goal not found", "NotExist");
}
