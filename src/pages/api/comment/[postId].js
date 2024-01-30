import mw from "@/api/mw"
import validate from "@/api/middlewares/validate"
import { idValidator, bodyValidator } from "@/utils/validators"

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
      models: { CommentModel },
    }) => {
      const comments = await CommentModel.query().where({ postId }).select()
      send(comments)
    },
  ],
  POST: [
    validate({
      query: {
        postId: idValidator.required(),
      },
      body: {
        body: bodyValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        query: { postId },
        body: { body },
      },
      models: { CommentModel },
    }) => {
      const comment = await CommentModel.query().insert({
        body,
        postId,
      })
      send(comment)
    },
  ],
})

export default handle
