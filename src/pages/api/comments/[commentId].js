import validate from "@/api/middlewares/validate"
import { mw } from "@/api/mw"
import { idValidator } from "@/utils/validators"

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
})

export default handle
