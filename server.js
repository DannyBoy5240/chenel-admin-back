const express = require("express");
const env = require("dotenv");
const favicon = require("serve-favicon");
var path = require("path");
var cors = require("cors");

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
    // origin: "http://195.201.246.182:3000",
    origin: "http://localhost:3000",
  })
);

// sets favicon in routes
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

// sets static folder
app.use(express.static(path.join(__dirname, "public")));

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

app.get("/api/uploads/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(
    path.join(__dirname, "../chenel-admin-front/public/uploads", imageName)
  );
  console.log("-->", imagePath);
  const imageExtension = path.extname(imagePath).toLowerCase(); // Convert to lowercase for case insensitivity

  // Define an array of common image extensions
  const imageExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".jfif",
    ".gif",
    ".bmp",
    ".tiff",
    ".webp",
  ];

  if (imageExtensions.includes(imageExtension)) {
    res.setHeader("Content-Type", `image/${imageExtension.substr(1)}`); // Set content type dynamically
    res.setHeader("Content-Disposition", "inline"); // Set to 'inline' to display in the browser
    res.sendFile(imagePath);
  } else {
    res.setHeader("Content-Disposition", "attachment"); // Set to 'attachment' for non-image files
    res.sendFile(imagePath);
  }
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
