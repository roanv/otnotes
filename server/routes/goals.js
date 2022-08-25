const express = require("express");
const router = express.Router();
const goalsDB = require("../models/goals");

const decode = {
  23505: { status: 400, message: "as it already exists" },
  NotExist: { status: 400, message: "as it was not found" },
  NoName: { status: 400, message: "as name was not specified" },
  NoID: { status: 400, message: "as id was not specified" },
  NoGoal: { status: 400, message: "as goal was not specified" },
  default: { status: 500, message: "due to an internal server error" },
};

function genResponse(outcome, goal, error) {
  let item = "goal";
  if (goal) {
    if (goal.name) item = `"${goal.name}"`;
    else if (goal.id) item = `goal with id '${goal.id}'`;
  }
  let { status, message } = decode[error.code] || decode["default"];
  if (status === 500) console.log("unexpected database error: ", error);
  return { status, message: `${outcome} ${item} ${message}.` };
}

router.post("/", async (req, res) => {
  const goal = req.body;
  try {
    res.json(await goalsDB.create(goal));
  } catch (error) {
    const { status, message } = genResponse("Could not create", goal, error);
    return res.status(status).send(message);
  }
});

router.get("/", async (req, res) => {
  const goal = req.body;
  try {
    res.json(await goalsDB.find(goal));
  } catch (error) {
    const { status, message } = genResponse("Could not retrieve", goal, error);
    return res.status(status).send(message);
  }
});

router.put("/", async (req, res) => {
  const goal = req.body;
  try {
    res.json(await goalsDB.update(goal));
  } catch (error) {
    const { status, message } = genResponse("Could not update", goal, error);
    return res.status(status).send(message);
  }
});

router.delete("/", async (req, res) => {
  const goal = req.body;
  try {
    res.json(await goalsDB.remove(goal));
  } catch (error) {
    const { status, message } = genResponse("Could not delete", goal, error);
    return res.status(status).send(message);
  }
});

module.exports = router;
