const express = require("express");
const { getRecipeById } = require("./models");

// const RecipesRouter = require('./recipes/recipe-router.js');

const server = express();

server.use(express.json());
// server.use('/api/recipes', RecipesRouter);

server.get("/api/:id", (req, res, next) => {
  getRecipeById(req.params.id)
    .then((recipe) => {
      res.status(200).json(recipe);
    })
    .catch((err) => console.log(err));
});

server.use("/", (req, res, next) => {
  console.log("Ping from server");
  res.status(200).json("Ping from server");
});

module.exports = server;
