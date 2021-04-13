const steps = [
  { recipe_id: 1, step_number: 2, instruction: "crack cyber Eggs" },
  { recipe_id: 1, step_number: 1, instruction: "solve prime cooking theory" },
  { recipe_id: 1, step_number: 3, instruction: "Heat you pans world leaders" },
  { recipe_id: 2, step_number: 2, instruction: "profitable prep" },
  { recipe_id: 2, step_number: 1, instruction: "sheep in Scotland" },
];

exports.steps = steps;

exports.seed = function (knex) {
  return knex("steps").insert(steps);
};
