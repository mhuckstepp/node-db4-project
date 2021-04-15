const express = require("express");
const { getRecipeById } = require("./models");

const server = express();

server.use(express.json());

// eslint-disable-next-line
server.get("/api/:id", (req, res, next) => {
  getRecipeById(req.params.id)
    .then((recipe) => {
      res.status(200).json(recipe);
    })
    .catch((err) => {
      res.status(400).json({
        message: "Something went wrong",
        error: err.message,
      });
    });
});

// eslint-disable-next-line
server.use("/", (req, res, next) => {
  res.status(200).json("You hit the server");
});

module.exports = server;
