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
  let query = `INSERT INTO ${TABLE} (${COL.NAME})`;
  query += ` VALUES ('${item.name}')`;
  query += ` RETURNING *`;
  return await getRows(query);
};

exports.get = async function get(item) {
  let query = `SELECT * FROM ${TABLE}`;
  if (item && item.id) query += ` WHERE id='${item.id}'`;
  query += " ORDER BY name ASC";
  return await getRows(query);
};

function requireInput(item, requirements) {
  if (!item) throw new DatabaseError("item not provided", "NoItem");
  if (requirements.includes("id") && !item.id)
    throw new DatabaseError("'id' not provided", "NoID");
  if (requirements.includes("name") && !item.name)
    throw new DatabaseError("'name' not provided", "NoName");
}
