const recipes = [
  { recipe_name: "Cheese" },
  { recipe_name: "Pasata" },
  { recipe_name: "Pizza" },
  { recipe_name: "Meatballs " },
  { recipe_name: "Fire the Holy Grail" },
  { recipe_name: "coworkers lunch" },
  { recipe_name: "dirt" },
];

exports.recipes = recipes;

exports.seed = function (knex) {
  return knex("recipes").insert(recipes);
};
