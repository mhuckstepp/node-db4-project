const ingredients = [
  { ingredient: "sauce" },
  { ingredient: "bread" },
  { ingredient: "oil" },
  { ingredient: "veggie " },
  { ingredient: "avacado" },
];

exports.ingredients = ingredients;

exports.seed = function (knex) {
  return knex("ingredients").insert(ingredients);
};
