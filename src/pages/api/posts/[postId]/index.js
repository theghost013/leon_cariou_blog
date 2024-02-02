import { mw } from "@/api/mw"
import { idValidator, bodyValidator } from "@/utils/validators"
import validate from "@/api/middlewares/validate"

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
      const post = await PostModel.query().where({ postId }).select()
      send(post)
    },
  ],
  PATCH: [
    validate({
      query: {
        postId: idValidator.required(),
      },
      body: {
        title: idValidator.required(),
        body: bodyValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        query: { postId },
        body: { title, body },
      },
      models: { PostModel },
    }) => {
      const post = await PostModel.query().findById(postId).throwIfNotFound()
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
