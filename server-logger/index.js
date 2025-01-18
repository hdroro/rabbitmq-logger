const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const publishMessage = require("./producer")

app.use(bodyParser.json("application/json"));

app.post("/send-log", async (req, res, next) => {
  await publishMessage(req.body.logType, req.body.message);
  res.send();
});

app.listen(3000, () => {
  console.log("Server started...");
});
