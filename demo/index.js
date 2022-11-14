const express = require("express");
const app = express();
const ExpressIPBlocker = require("../dist/index.js");
const ipBlocker = new ExpressIPBlocker();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(ipBlocker.checkIP);
app.get("/", function (req, res, next) {
  res.send("Hello World");
});
app.listen(3000, () => {
  console.log("port listening");
});
