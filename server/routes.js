const express = require("express");
const goals = require("./routes/goals");
const principles = require("./routes/principles");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/goals", goals);
  app.use("/api/principles", principles);
};
