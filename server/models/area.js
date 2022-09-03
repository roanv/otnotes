const db = require("../database/pg");
const TABLE = "area";

const COL = {
  NAME: "name",
  ID: "id",
  PATH: "path",
};

async function getRows(query) {
  const result = await db.query(query);
  return result.rows;
}

exports.create = async function create(item) {
  requireInput(item, ["name"]);
  const insert = `INSERT INTO ${TABLE} (${COL.NAME})`;
  const values = ` VALUES ('${item.name}')`;
  const result = ` RETURNING *`;
  return await getRows(insert + values + result);
};

exports.get = async function get(item) {
  let query = `SELECT * FROM ${TABLE}`;
  if (item && item.id) query += ` WHERE id='${item.id}'`;
  return await getRows(query);
};

function requireInput(item, requirements) {
  if (!item) throw new DatabaseError("item not provided", "NoItem");
  if (requirements.includes("id") && !item.id)
    throw new DatabaseError("'id' not provided", "NoID");
  if (requirements.includes("name") && !item.name)
    throw new DatabaseError("'name' not provided", "NoName");
}
