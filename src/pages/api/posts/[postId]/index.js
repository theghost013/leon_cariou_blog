import mw from "@/api/mw"
import { idValidator, bodyValidator, titleValidator } from "@/utils/validators"
import validate from "@/api/middlewares/validate"
import auth from "@/api/middlewares/auth"
import isAuthor from "@/api/middlewares/isAuthor"
import { HttpForbiddenError } from "@/api/errors"

const handle = mw({
  GET: [
    validate({
      query: {
        postId: idValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        query: { postId },
      },
      models: { PostModel },
    }) => {
      const post = await PostModel.query()
        .findById(postId)
        .withGraphFetched("user")
        .withGraphFetched("comments")
        .withGraphFetched("comments.user")
        .throwIfNotFound()

      // eslint-disable-next-line no-console
      console.log("post", post)
      // eslint-disable-next-line no-console
      console.log(Array.isArray(post))

      send(post)
    },
  ],
  PATCH: [
    auth,
    isAuthor,
    validate({
      query: {
        postId: idValidator.required(),
      },
      body: {
        title: titleValidator.required(),
        body: bodyValidator.required(),
      },
      data: {
        userId: idValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        query: { postId },
        body: { title, body },
      },
      models: { PostModel },
      data: { userId },
    }) => {
      const post = await PostModel.query().findById(postId).throwIfNotFound()

      if (post.userId !== userId) {
        throw new HttpForbiddenError()
      }

      await post.$query().update({
        title,
        body,
      })

      send(post)
    },
  ],
  DELETE: [
    validate({
      query: {
        postId: idValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        query: { postId },
      },
      models: { PostModel },
    }) => {
      const post = await PostModel.query().findById(postId).throwIfNotFound()
      await post.$query().delete()
      send(post)
    },
  ],
})

export default handle
