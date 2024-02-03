import mw from "@/api/mw"
import validate from "@/api/middlewares/validate"
import { idValidator, bodyValidator } from "@/utils/validators"
import auth from "@/api/middlewares/auth"

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
    auth,
    validate({
      query: {
        postId: idValidator.required(),
      },
      body: {
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
        body: { body },
      },
      models: { CommentModel },
      data: { userId },
    }) => {
      const comment = await CommentModel.query().insert({
        body,
        postId,
        userId,
      })
      send(comment)
    },
  ],
})

export default handle
