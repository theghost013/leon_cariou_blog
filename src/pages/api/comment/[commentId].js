import validate from "@/api/middlewares/validate"
import { mw } from "@/api/mw"
import { idValidator, bodyValidator } from "@/utils/validators"

const handle = mw({
  GET: [
    validate({
      query: {
        commentId: idValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        query: { commentId },
      },
      models: { CommentModel },
    }) => {
      const comment = await CommentModel.query()
        .findById(commentId)
        .throwIfNotFound()
      send(comment)
    },
  ],
  PATCH: [
    validate({
      query: {
        commentId: idValidator.required(),
      },
      body: {
        body: bodyValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        query: { commentId },
        body: { body },
      },
      models: { CommentModel },
    }) => {
      const comment = await CommentModel.query()
        .findById(commentId)
        .throwIfNotFound()
      await comment.$query().update({
        body,
      })
      send(comment)
    },
  ],
  DELETE: [
    validate({
      query: {
        commentId: idValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        query: { commentId },
      },
      models: { CommentModel },
    }) => {
      const comment = await CommentModel.query()
        .findById(commentId)
        .throwIfNotFound()
      await comment.$query().delete()
      send(comment)
    },
  ],
})

export default handle
