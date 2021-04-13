exports.up = function (knex) {
  return knex.schema
    .createTable("recipes", (tbl) => {
      tbl.increments("recipe_id");
      tbl.string("recipe_name", 128).notNullable().unique();
      tbl.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    })
    .createTable("ingredients", (tbl) => {
      tbl.increments("ingredient_id");
      tbl.string("ingredient").notNullable();
    })
    .createTable("steps", (tbl) => {
      tbl.increments("step_id");
      tbl.string("instruction");
      tbl.integer("step_number");
      tbl
        .integer("recipe_id")
        .unsigned()
        .notNullable()
        .references("recipe_id")
        .inTable("recipes")
        .onDelete("cascade");
    })
    .createTable("step_ingredients", (tbl) => {
      tbl.increments("step_ingredient_id");
      tbl.integer("quantity");
      tbl
        .integer("step_id")
        .unsigned()
        .notNullable()
        .references("step_id")
        .inTable("steps")
        .onDelete("cascade");
      tbl
        .integer("ingredient_id")
        .unsigned()
        .notNullable()
        .references("ingredient_id")
        .inTable("ingredients")
        .onDelete("cascade");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("ingredient_id")
    .dropTableIfExists("step_ingredients")
    .dropTableIfExists("steps")
    .dropTableIfExists("recipes");
};
