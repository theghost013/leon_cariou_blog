export const up = async (db) => {
    await db.schema.createTable("posts", (table) => {
        table.increments("id").primary()
        table.text("title").notNullable()
        table.text("body").notNullable()
        table.integer("user_id").unsigned().notNullable()
        table.foreign("user_id").references("users.id")
        table.timestamps(true, true)
    })
}

export const down = async (db) => {
    await db.schema.dropTableIfExists("posts")
}