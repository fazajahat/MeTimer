require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const { connectDB } = require("./config/mongodb.config");
const { User } = require("./model/");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.post("/register", async (req, res, next) => {
  try {
    const { username, email, password, phoneNumber, address } = req.body;
    const userData = {
      username,
      email,
      password,
      phoneNumber,
      address,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    if (!username || !email || !password) {
      throw {
        name: "REGISTER_INVALID_INPUT",
        message: "Missing one or more input in post register",
      };
    }

    // Validate for unique username and email
    const newUser = await User.findOrCreate(username, email, userData);
    if (!newUser) {
      throw {
        name: "ALREADY_EXIST",
        message: "Username or email already exist",
      };
    }
    console.log(newUser);
    res.status(201).json({message : "New user successfully created", id: newUser});
  } catch (err) {
    next(err);
  }
});

// Error Handler
app.use((err, req, res, next) => {
  console.log(err);
  let status = 500;
  let message = "Internal server error";

  if (err.name === "REGISTER_INVALID_INPUT" || err.name === "ALREADY_EXIST") {
    status = 404;
    message = err.message;
  }

  res.status(status).json({ message });
});

connectDB().then((db) => {
  app.listen(PORT, () => {
    console.log("Server started on port " + PORT);
  });
});
