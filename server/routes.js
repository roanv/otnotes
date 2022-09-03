const express = require("express");
// const goals = require("./routes/goals");
// const principles = require("./routes/principles");
const areas = require("./routes/areas");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/areas", areas);
  // app.use("/api/goals", goals);
  // app.use("/api/principles", principles);
};
