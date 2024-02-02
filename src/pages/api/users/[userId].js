import mw from "@/api/mw"
import validate from "@/api/middlewares/validate"
import {
  idValidator,
  nameValidator,
  emailValidator,
  roleValidator,
} from "@/utils/validators"

const handle = mw({
  GET: [
    validate({
      query: {
        userId: idValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        query: { userId },
      },
      models: { UserModel },
    }) => {
      const user = await UserModel.query().findById(userId).throwIfNotFound()

      send(user)
    },
  ],
  PATCH: [
    validate({
      body: {
        userId: idValidator.required(),
        username: nameValidator.required(),
        email: emailValidator.required(),
        role: roleValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        body: { userId, email, username, role },
      },
      models: { UserModel },
    }) => {
      const user = await UserModel.query().findById(userId).throwIfNotFound()

      await user.$query().update({
        email,
        username,
        role,
      })

      send(true)
    },
  ],

  DELETE: [
    validate({
      query: {
        userId: idValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        query: { userId },
      },
      models: { UserModel },
    }) => {
      const user = await UserModel.query().findById(userId).throwIfNotFound()
      // eslint-disable-next-line no-console
      console.log(user)

      await user.$query().delete()

      send(user)
    },
  ],
})

export default handle
