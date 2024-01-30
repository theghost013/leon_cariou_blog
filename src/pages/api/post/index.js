const handle = mw({
  GET: [
    async ({ send, models: { UserModel } }) => {
      const users = await UserModel.query().select(
        "id",
        "username",
        "email",
        "isActive",
        "role",
        "created_at",
        "updated_at",
      )

      send(users)
    },
  ],
})

export default handle
