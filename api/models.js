const db = require("../data/knex");

async function getRecipeById(recipe_id) {
  let dbresult = await db
    .select("r.*", "st.*", "sti.*")
    .from({ r: "recipes" })
    .leftJoin({ st: "steps" }, "st.recipe_id", "r.recipe_id")
    .join({ sti: "step_ingredients" }, "sti.step_id", "st.step_id")
    .where({ "r.recipe_id": recipe_id });

  return dbresult;
}

module.exports = {
  getRecipeById,
};
