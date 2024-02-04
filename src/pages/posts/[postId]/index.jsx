import { readResource } from "@/web/services/apiClient"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import CreateComment from "@/web/components/CreateComment"
import { useState } from "react"
import { useSession } from "@/web/components/SessionContext"
import CommentsList from "@/web/components/CommentsList"

const PostPage = () => {
  const [comments, setComments] = useState(false)
  const { session } = useSession()
  const router = useRouter()
  const {
    query: { postId },
  } = useRouter()
  const {
    isLoading,
    refetch,
    data: { data: { result: [post] = [] } = {} } = {},
  } = useQuery({
    queryKey: ["post"],
    queryFn: () => readResource(`posts/${postId}`),
    enabled: Boolean(postId),
    initialData: { data: {} },
  })

  if (isLoading) {
    return "Loading..."
  }

  if (!post && !isLoading) {
    return "Post not found"
  }

  return (
    <article>
      {post.userId === session?.user.id && (
        <button onClick={() => router.push(`/posts/${post.id}/update`)}>
          Edit
        </button>
      )}
      <h1 className="text-2xl">
        {post.title} (#{post.id})
      </h1>
      <p>{post.body}</p>
      <p>{post.views.toString()}</p>
      {session && (
        <button onClick={() => setComments(!comments)}>Comment</button>
      )}
      {comments && <CreateComment postId={postId} refetch={refetch} />}
      {post.comments.map(({ id, body, user }) => (
        <li key={id}>
          <CommentsList body={body} user={user} />
        </li>
      ))}
    </article>
  )
}

export default PostPage
