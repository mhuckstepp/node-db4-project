const db = require("../data/knex");

async function getRecipeById(recipe_id) {
  let recipe = await db
    .select("r.*")
    .from({ r: "recipes" })
    .where({ "r.recipe_id": recipe_id })
    .first();

  let steps = await db
    .select("st.step_id", "st.step_number", "st.instruction")
    .from({ r: "recipes" })
    .leftJoin({ st: "steps" }, "st.recipe_id", "r.recipe_id")
    .where({ "r.recipe_id": recipe_id })
    .orderBy("st.step_number");

  let ingredients = await db
    .select("st.*", "sti.*", "i.ingredient")
    .from({ st: "steps" })
    .leftJoin({ sti: "step_ingredients" }, "sti.step_id", "st.step_id")
    .join({ i: "ingredients" }, "i.ingredient_id", "sti.ingredient_id");

  let mappedSteps = steps.map((step) => {
    let mapStepIngredients = ingredients
      .filter((ingredient) => ingredient.step_id === step.step_id)
      .map((ingredient) => {
        return {
          quantity: ingredient.quantity,
          ingredient: ingredient.ingredient,
        };
      });

    return {
      step_id: step.step_id,
      step_number: step.step_number,
      instruction: step.instruction,
      ingredients: mapStepIngredients,
    };
  });

  let dbresult = await db
    .select("st.*", "sti.*")
    .from({ r: "recipes" })
    .leftJoin({ st: "steps" }, "st.recipe_id", "r.recipe_id")
    .join({ sti: "step_ingredients" }, "sti.step_id", "st.step_id")
    .where({ "r.recipe_id": recipe_id });

  return {
    recipe_id: recipe.recipe_id,
    recipe_name: recipe.recipe_name,
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
