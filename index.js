// index.js
// where your node app starts

// init project
const express = require("express");
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date", (req, res) => {
  const date = req.params.date;
  let dateObject = new Date(date);
  if (dateObject.toString() === "Invalid Date") {
    dateObject = new Date(parseInt(date));
  }
  if (dateObject.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }
  res.json({ unix: dateObject.getTime(), utc: dateObject.toUTCString() });
});

app.get("/api/", (req, res) => {
  const dateObject = new Date()
  res.json({ unix: dateObject.getTime(), utc: dateObject.toUTCString() });
})

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
