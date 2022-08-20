const express = require("express");
var cors = require("cors");

const app = express();
const path = require("path");

app.use(cors());

app.use(express.static(path.join(__dirname, "../client/build")));

require("./routes")(app);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/build/index.html"));
});

const PORT = process.env.PORT || 5000; // use either the host env var port (PORT) provided by Heroku or the local port (5000) on your machine

app.listen(PORT, () => {
  // start server and listen on specified port
  console.log(`App is running on ${PORT}`); // confirm server is running and log port to the console
});
