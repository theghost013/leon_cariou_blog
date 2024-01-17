export const up = async (db) => {
  await db.schema.alterTable("users", (table) => {
    table.dropColumn("password")
  })
  await db.schema.alterTable("users", (table) => {
    table.text("passwordHash").notNullable()
    table.text("passwordSalt").notNullable()
  })
}

export const down = async (db) => {
  await db.schema.alterTable("users", (table) => {
    table.dropColumn("passwordHash")
    table.dropColumn("passwordSalt")
  })
  await db.schema.alterTable("users", (table) => {
    table.text("password").notNullable()
  })
}
