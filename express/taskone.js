const express = require("express");

const app = express();

// Middleware to parse JSON data in the request body
app.use(express.json());

let users = [
  { id: 1, name: "John Doe", age: 30 },
  { id: 2, name: "Jane Smith", age: 25 },
];

// get all users
app.get("/users", (req, res) => {
  res.status(200).json({
    status: "success",
    data: users,
  });
});

// create new user
app.post("/user/create", (req, res) => {
  const newId = users[users.length - 1].id + 1;
  const newUser = Object.assign({ id: newId }, req.body);
  users.push(newUser);

  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});

// edit user
app.patch("/users/:id/edit", (req, res) => {
  const id = req.params.id * 1;
  const { name, age } = req.body;

  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status("404").json({
      status: "fail",
      message: "user not found",
    });
  }
  user.name = name || user.name;
  user.age = age || user.age;
  res.status("200").json({
    status: "success",
    data: {
      user,
    },
  });
});

// delete user

app.delete("/users/:id/delete", (req, res) => {
  const id = req.params.id * 1;

  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ status: "fill", message: "user not found" });
  }
  users.splice(userIndex, 1);
  res.status("204").json({
    status: "success",
    message: "User deleted successfully",
    data: null,
  });
});
// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`your port is running on port ${port}`);
});
