import mw from "@/api/mw"
import validate from "@/api/middlewares/validate"
import auth from "@/api/middlewares/auth"
import { idValidator, nameValidator } from "@/utils/validators"

const handle = mw({
  GET: [
    auth,
    validate({
      data: {
        userId: idValidator.required(),
      },
    }),
    async ({ send, models: { UserModel }, data: { userId } }) => {
      const user = await UserModel.query()
        .findById(userId)
        .withGraphFetched("posts")
        .withGraphFetched("comments")
        .throwIfNotFound()
      const countPosts = user.posts.length
      const countComments = user.comments.length
      const countViews = user.posts.reduce((acc, post) => acc + post.views, 0)

      send(user, { countPosts, countComments, countViews })
    },
  ],
  PATCH: [
    auth,
    validate({
      body: {
        username: nameValidator.required(),
      },
      data: {
        userId: idValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        body: { username },
      },
      models: { UserModel },
      data: { userId },
    }) => {
      const user = await UserModel.query().findById(userId).throwIfNotFound()

      await user.$query().update({
        username,
      })

      send(user)
    },
  ],
})

export default handle
