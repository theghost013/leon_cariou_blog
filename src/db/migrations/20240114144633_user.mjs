export const up = async (db) => {
  await db.schema.createTable("users", (table) => {
    table.increments("id").primary()
    table.text("email").notNullable()
    table.text("password").notNullable()
    table.text("first_name").notNullable()
    table.text("last_name").notNullable()
    table.text("role").notNullable()
    table.timestamps(true, true)
  })
}

export const down = async (db) => {
  await db.schema.dropTableIfExists("users")
}
