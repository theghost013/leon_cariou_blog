const CommentsList = ({ body, user }) => (
  <article className="flex flex-col gap-1 border border-sky-700 rounded p-2">
    <h1 className="text-xl">{user.username}</h1>
    <p>{body}</p>
  </article>
)

export default CommentsList
