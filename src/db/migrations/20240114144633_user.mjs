export const up = async (db) => {
  await db.schema.createTable("users", (table) => {
    table.increments("id").primary()
    table.text("email").notNullable()
    table.text("password").notNullable()
    table.text("username").notNullable()
    table.boolean("isActive").notNullable().defaultTo(true)
    table.text("role").notNullable().defaultTo("user")
    table.timestamps(true, true)
  })
}

export const down = async (db) => {
  await db.schema.dropTableIfExists("users")
}
