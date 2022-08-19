const express = require("express");
const goals = require("./routes/goals");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/goals", goals);
};
