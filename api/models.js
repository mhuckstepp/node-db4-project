const db = require("../data/knex");

function getRecipeById(recipe_id) {
  return db("recipes")
    .select()
    .leftJoin("steps", "steps.recipe_id", "recipes.recipe_id")
    .where({ "recipes.recipe_id": recipe_id });
}

module.exports = {
  getRecipeById,
};
