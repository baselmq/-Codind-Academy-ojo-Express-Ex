// Import express-validator module
const { check } = require("express-validator");

// Create validation chains for name, email, and password fields
const nameValidation = check("name", "Name is required").notEmpty();
const emailValidation = check("email", "Invalid email address").isEmail();
const passwordValidation = check(
  "password",
  "Password must be at least 6 characters long"
).isLength({ min: 6 });

// Import express-validator module
const { validationResult } = require("express-validator");

// Get the result of the validation process
// const result = validationResult(req);

// // Check if there are any validation errors
// if (!result.isEmpty()) {
//   // Do something with the errors
//   console.log(result.array());
// }

// Define route for POST /register
app.post(
  "/register",
  [nameValidation, emailValidation, passwordValidation],
  (req, res) => {
    // Get the result of the validation process
    const result = validationResult(req);

    // Check if there are any validation errors
    if (!result.isEmpty()) {
      // Send a status code 400 and the first error message as the response
      res.status(400).send(result.array()[0].msg);
    } else {
      // Do something with the valid input data
      console.log(req.body);

      // Send a success message as the response
      res.send("You are registered successfully");
    }
  }
);
