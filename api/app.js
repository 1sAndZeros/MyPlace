const express = require("express");
const logger = require("morgan");
var cors = require("cors");
const path = require("path");
const createError = require("http-errors");
const tokenChecker = require("./lib/tokenChecker");
const authenticationRouter = require("./routes/authentication");
const usersRouter = require("./routes/users");

const app = express();

app.use(express.json()); // setup for receiving JSON
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173", // cors origin for browser security
  })
);
app.use(logger("dev")); // logs HTTP request in terminal
app.use(express.static(path.join(__dirname, "public"))); // folder path for static/public files

// route setup
app.use("/tokens", authenticationRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // respond with details of the error
  res.status(err.status || 500).json({ message: "server error" });
});

module.exports = app;
