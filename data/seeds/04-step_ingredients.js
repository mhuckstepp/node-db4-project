const step_ingredients = [
  { step_id: 1, ingredient_id: 1, quantity: 10 },
  { step_id: 1, ingredient_id: 2, quantity: 12 },
  { step_id: 1, ingredient_id: 3, quantity: 2 },
  { step_id: 2, ingredient_id: 4, quantity: 5 },
  { step_id: 3, ingredient_id: 5, quantity: 2 },
];

exports.steps = step_ingredients;

exports.seed = function (knex) {
  return knex("step_ingredients").insert(step_ingredients);
};
