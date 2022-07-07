import express from "express";
import mongoose from "mongoose";
import cors from "cors";

//const { express } = require("express");
//const { mongoose } = require("mongoose");
//const { cors } = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://Hammad:Hammadhammad1@cluster0.wa042.mongodb.net/?retryWrites=true&w=majority",
    {
      //userNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

app.get("/Sign", (req, res) => {
  res.send("Signuddddp");
});

//route
app.post("/Signup", (req, res) => {
  const { name, email, phoneno, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "user already exists" });
    } else {
      const user = new User({
        name,
        email,
        phoneno,
        password,
      });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Sucesfully registered" });
        }
      });
    }
  });
});

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  phoneno: String,
  password: String,
});

const User = new mongoose.model("User", userSchema);

app.listen(3021, () => {
  console.log("Listening on port 3020");
});
