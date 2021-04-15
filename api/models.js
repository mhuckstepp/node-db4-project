const db = require("../data/knex");

async function getRecipeById(recipe_id) {
  let steps = await db("recipes as r")
    .select(
      "st.step_id",
      "st.step_number",
      "st.instruction",
      "r.recipe_id",
      "r.recipe_name"
    )
    .leftJoin("steps as st", "st.recipe_id", "r.recipe_id")
    .where({ "r.recipe_id": recipe_id })
    .orderBy("st.step_number");

  let ingredients = await db("steps as st")
    .select("st.*", "sti.*", "i.ingredient")
    .leftJoin("step_ingredients as sti", "sti.step_id", "st.step_id")
    .join("ingredients as i", "i.ingredient_id", "sti.ingredient_id");

  let mappedSteps = steps.map((step) => {
    let mapStepIngredients = ingredients
      .filter((ingredient) => ingredient.step_id === step.step_id)
      .map((ingredient) => {
        return {
          quantity: ingredient.quantity,
          ingredient: ingredient.ingredient,
        };
      });
    if (step.step_id) {
      return {
        step_id: step.step_id,
        step_number: step.step_number,
        instruction: step.instruction,
        ingredients: mapStepIngredients,
      };
    }
  });

  return {
    recipe_id: steps[0].recipe_id,
    recipe_name: steps[0].recipe_name,
    steps: mappedSteps,
  };
}

module.exports = {
  getRecipeById,
};

// {
//   "recipe_id": 1,
//   "recipe_name": "Spaghetti Bolognese",
//   "created_at": "2021-01-01 08:23:19.120",
//   "steps": [
//     {
//       "step_id": 11,
//       "step_number": 1,
//       "step_instructions": "Put a large saucepan on a medium heat",
//       "ingredients": []
//     },
//     {
//       "step_id": 12,
//       "step_number": 2,
//       "step_instructions": "Add 1 tbsp olive oil",
//       "ingredients": [
//         {
//           "ingredient_id": 27,
//           "ingredient_name": "olive oil",
//           "quantity": 0.014
//         }
//       ]
//     }
//   ]
// }
