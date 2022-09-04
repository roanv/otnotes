const express = require("express");
const router = express.Router();
const model = require("../models/area");

const decode = {
  23505: { status: 400, message: "as it already exists" },
  NotExist: { status: 400, message: "as it was not found" },
  NoName: { status: 400, message: "as name was not specified" },
  NoID: { status: 400, message: "as id was not specified" },
  Invalid: { status: 400, message: "as area was not specified" },
  default: { status: 500, message: "due to an internal server error" },
};

function getResponse(operation, subject, item, error) {
  if (item) {
    if (item.name) subject += ` "${item.name}"`;
    else if (item.id) subject += ` with id '${item.id}'`;
  }
  let { status, message } = decode[error.code] || decode["default"];
  if (status === 500) console.log("unexpected database error: ", error);
  return {
    status,
    message: `Could not ${operation} ${subject} ${message}.`,
  };
}

router.post("/", async (req, res) => {
  const item = req.body;
  try {
    res.json(await model.create(item));
  } catch (error) {
    const { status, message } = getResponse("create", "area", item, error);
    return res.status(status).send(message);
  }
});

router.get("/", async (req, res) => {
  const item = req.body;
  try {
    res.json(await model.get(item));
  } catch (error) {
    const { status, message } = getResponse("retrieve", "area", item, error);
    return res.status(status).send(message);
  }
});

// router.put("/", async (req, res) => {
//   const item = req.body;
//   try {
//     res.json(await model.update(item));
//   } catch (error) {
//     const { status, message } = genResponse("Could not update", item, error);
//     return res.status(status).send(message);
//   }
// });

// router.delete("/", async (req, res) => {
//   const item = req.body;
//   try {
//     res.json(await model.remove(item));
//   } catch (error) {
//     const { status, message } = genResponse("Could not delete", item, error);
//     return res.status(status).send(message);
//   }
// });

module.exports = router;
