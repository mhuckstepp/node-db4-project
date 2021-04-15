const express = require("express");
const { getRecipeById } = require("./models");

const server = express();

server.use(express.json());

server.get("/api/:id", (req, res, next) => {
  getRecipeById(req.params.id)
    .then((recipe) => {
      res.status(200).json(recipe);
    })
    .catch((err) => console.log(err));
});

// eslint-disable-next-line
server.use("/", (req, res, next) => {
  res.status(200).json("You hit the server");
});

module.exports = server;
