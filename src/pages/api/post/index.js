import mw from "@/api/mw"

const handle = mw({
  GET: [
    async ({ send, models: { PostModel } }) => {
      const posts = await PostModel.query().select(
        "id",
        "title",
        "content",
        "created_at",
        "updated_at",
      )

      send(posts)
    },
  ],
  POST: [
    async ({
      send,
      input: {
        query: { userId },
        body: { title, body },
      },
      models: { PostModel },
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
