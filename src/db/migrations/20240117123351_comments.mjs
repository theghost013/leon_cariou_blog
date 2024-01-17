export const up = async (db) => {
  await db.schema.createTable("comments", (table) => {
    table.increments("id").primary()
    table.text("body").notNullable()
    table.integer("userId").unsigned().notNullable()
    table.foreign("userId").references("users.id")
    table.integer("postId").unsigned().notNullable()
    table.foreign("postId").references("posts.id")
    table.timestamps(true, true)
  })
}

export const down = async (db) => {
  await db.schema.dropTableIfExists("comments")
}
