const express = require("express");
const env = require("dotenv");
const favicon = require("serve-favicon");
var path = require("path");
var cors = require("cors");
// const resolvePath = path.resolve;

// imports routes, middleware, and configs
const users = require("./src/routes/user.route");
const stripepayment = require("./src/routes/stripepayment.route");
const paypalpayment = require("./src/routes/paypalpayment.route");
const { notFoundRoute, errorHandler } = require("./src/configs/errorHandler");

// loads environment variables from .env file
env.config();

// initializes express app
const app = express();

// application database connection establishment
const connectDatabase = require("./src/db");
connectDatabase();

// corss-origin-allow-all
app.use(
  cors({
    origin: "http://195.201.246.182:3000",
    // origin: "http://localhost:3000",
    // origin: "http://chenelsuperservice.com",
  })
);

// sets favicon in routes
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

// sets static folder
app.use(express.static(path.join(__dirname, "public")));
// app.use(expess.static(resolvePath(__dirname, "static/build")));
// app.use('/uploads', express.static(path.join(__dirname, "../chenel-admin-front/public/uploads/")));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// sets default route
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to CHENEL Node.js application backend." });
});

app.use("/api/users", users);
app.use("/api/stripepayment", stripepayment);
app.use("/api/paypal", paypalpayment);

// 404 - not found error handler
app.use(notFoundRoute);

// error handler
app.use(errorHandler);

// app listens to defined port
app.listen(process.env.APP_PORT, () => {
  console.log("CHENEL backend server running on: " + process.env.APP_BASE_URL);
});
