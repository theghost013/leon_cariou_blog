const CommentsList = ({ body, user }) => (
  <article className="flex flex-col gap-4">
    <h1 className="text-2xl">{user.username}</h1>
    <p>{body}</p>
  </article>
)

export default CommentsList
