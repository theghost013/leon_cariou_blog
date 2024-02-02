import auth from "@/api/middlewares/auth"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  pageValidator,
  titleValidator,
  bodyValidator,
  idValidator,
} from "@/utils/validators"

const handle = mw({
  GET: [
    validate({
      query: {
        page: pageValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        query: { page },
      },
      models: { PostModel },
    }) => {
      const query = PostModel.query()
      const posts = await query.clone().withGraphFetched("user").page(page)
      const [{ count }] = await query.clone().count()

      send(posts, { count })
    },
  ],
  POST: [
    auth,
    validate({
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
        body: { title, body },
      },
      models: { PostModel },
      data: { userId },
    }) => {
      const post = await PostModel.query().insert({
        title,
        body,
        userId,
      })
      send(post)
    },
  ],
})

export default handle
