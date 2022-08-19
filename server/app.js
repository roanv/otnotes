const express = require("express"); // import express module (simplifies routing/requests, among other things)
const app = express(); // create an instance of the express module (app is the conventional variable name used)
require("./routes")(app);

const PORT = process.env.PORT || 5000; // use either the host env var port (PORT) provided by Heroku or the local port (5000) on your machine

app.listen(PORT, () => {
  // start server and listen on specified port
  console.log(`App is running on ${PORT}`); // confirm server is running and log port to the console
});
