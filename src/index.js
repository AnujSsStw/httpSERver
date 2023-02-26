var express = require("express");
var https = require("https");
var http = require("http");
var fs = require("fs");

// This line is from the Node.js HTTPS documentation.
var options = {
  key: fs.readFileSync(__dirname + "/server.key"),
  cert: fs.readFileSync(__dirname + "/server.cert"),
};

// Create a service (the app object is just a callback).
var app = express();

app.get("/", (req, res) => {
  res.send("StandAlone server");
});

// // Create an HTTP service.
const server = http.createServer(app);
server.on("error", (err) => {
  console.log(err);
});

server.listen(8000);

// // Create an HTTPS service identical to the HTTP service.
https
  .createServer(options, app)
  .on("error", (err) => {
    console.log("https err: " + err);
  })
  .listen(443);
