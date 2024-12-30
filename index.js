const express = require("express"); // Imports express
const app = express(); // Creates an express app
const results = require("./employees"); // Imports the employees data

// Initialize function that starts the server
const init = async () => {
  // Start listening on port 3000 and log a message when server starts
  app.listen(3000, () => console.log("Server is running on port 3000"));
};

// Define route handler for the root endpoint ('/')
app.get("/", async (req, res) => {
  // Send a 200 (OK) response with a simple text message
  res.status(200).send("Hello employees");
});

app.get("/employees", async (req, res) => {
  res.status(200).json(results);
});

app.get("/employees/random", async (req, res) => {
  // Get a random index between 0 and the length of the employees array
  const randomIndex = Math.floor(Math.random() * results.length);
  // Get the employee at that random index
  const randomEmployee = results[randomIndex];

  res.status(200).json(randomEmployee);
});

app.get("/employees/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const employee = results.find((emp) => emp.id === id);

  if (!employee) {
    return res
      .status(404)
      .json({ message: `Employee with id ${id} not found` });
  }

  res.status(200).json(employee);
});

// Call the init function to start the server
init();
