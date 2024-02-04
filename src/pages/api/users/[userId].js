import mw from "@/api/mw"
import validate from "@/api/middlewares/validate"
import {
  idValidator,
  nameValidator,
  roleValidator,
  isActiveValidator,
} from "@/utils/validators"
import auth from "@/api/middlewares/auth"
import isAdmin from "@/api/middlewares/isAdmin"

const handle = mw({
  GET: [
    auth,
    isAdmin,
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
    auth,
    isAdmin,
    validate({
      body: {
        username: nameValidator.required(),
        role: roleValidator.required(),
        isActive: isActiveValidator.required(),
      },
      query: {
        userId: idValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        query: { userId },
        body: { username, role, isActive },
      },
      models: { UserModel },
    }) => {
      const user = await UserModel.query().findById(userId).throwIfNotFound()

      await user.$query().update({
        username,
        role,
        isActive,
      })

      send(user)
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

      await user.$query().delete()

      send(user)
    },
  ],
})

export default handle
