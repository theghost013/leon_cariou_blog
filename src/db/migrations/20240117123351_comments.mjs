export const up = async (db) => {
  await db.schema.createTable("comments", (table) => {
    table.increments("id").primary()
    table.text("body").notNullable()
    table.integer("user_id").unsigned().notNullable()
    table.foreign("user_id").references("users.id")
    table.integer("post_id").unsigned().notNullable()
    table.foreign("post_id").references("posts.id")
    table.timestamps(true, true)
  })
}

export const down = async (db) => {
  await db.schema.dropTableIfExists("comments")
}
