const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { body, validationResult } = require("express-validator");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const morgan = require("morgan");
const fs = require("fs");

const port = 3000;
const app = express();

// Middleware
app.use(express.json());
app.use(
  session({
    secret: "your-secret-key", // Change this to a random and secure string
    resave: false,
    saveUninitialized: true,
  })
);

app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan("dev"));

// 1) ------------------------------------------------------------------------
// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// 2) ------------------------------------------------------------------------
app.get("/greet/:name", (req, res) => {
  const name = req.params.name;

  res.send(`Hello, ${name}`);
});

// 3) ------------------------------------------------------------------------
app.get("/echo", (req, res) => {
  const message = req.query.message;

  if (!message) {
    return res.status(400).send('Missing "message" query parameter');
  }
  res.send(message);
});

// 4) ------------------------------------------------------------------------
app.get("/data", (req, res) => {
  fs.readFile(`${__dirname}/db.json`, (err, data) => {
    if (err) {
      res.status(400).send("An error occurred while reading the file");
    } else {
      const user = JSON.parse(data);
      res.json(user);
    }
  });
});
// 5) ------------------------------------------------------------------------
app.post("/info", (req, res) => {
  const info = req.body;
  res.json(info);
});
// 6) ------------------------------------------------------------------------
// // Set a session variable "username" in one route
// app.get("/login", (req, res) => {
//   req.session.username = "basel";
//   console.log(req.session);
//   res.send("You are logged in");
// });

// // Access the session variable "username" in another route
// app.get("/", (req, res) => {
//   if (req.session.username) {
//     res.send(`Hello, ${req.session.username}`); // use the value of "username"
//   } else {
//     res.send("Please log in first");
//   }
// });
// 7) ------------------------------------------------------------------------
// app.get("/", (req, res) => {
//   // Check if the "username" cookie exists
//   const username = req.cookies.username;
//   // If "username" exists in the cookie, respond with a greeting
//   if (username) {
//     res.send(`Hello, ${username}`);
//   } else {
//     res.send("Hello, guest");
//   }
// }); // Route to set the "username" cookie
// app.get("/set-cookie", (req, res) => {
//   res.cookie("username", "basel", { maxAge: 900000 });
//   res.send('Cookie "username" set to "basel"');
// });
// 8) ------------------------------------------------------------------------
// Route to handle POST requests for user registration
app.post(
  "/register",
  [
    // Use the express-validator middleware to validate the "email" field
    body("email").isEmail().withMessage("Invalid email address"),
  ],
  (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);

    // If there are validation errors, send an error response
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ errors: errorMessages });
    }

    const userData = req.body;

    res.json({ message: "Registration successful", data: userData });
  }
);

// 9) ------------------------------------------------------------------------
// Route to handle GET requests
// app.get("/", (req, res) => {
//   res.send("Hello, world!");
// });
// 10) ------------------------------------------------------------------------
// Route to handle GET requests
// app.get("/", (req, res) => {
//   res.send("Hello, world!");
// });

// 11) ------------------------------------------------------------------------
// app.get("/", (req, res) => {
//   res.send("Hello, world!");
// });
// 12) ------------------------------------------------------------------------
app.get("/", (req, res) => {
  res.send("Hello, world!");
});
// Start the server
app.listen(3000, () => {
  console.log(`your port is running on port ${port}`);
});
