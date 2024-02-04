import { readResource } from "@/web/services/apiClient"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import CreateComment from "@/web/components/CreateComment"
import { useState } from "react"
import { useSession } from "@/web/components/SessionContext"
import CommentsList from "@/web/components/CommentsList"
import Button from "@/web/components/ui/Button"

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
      <h1 className="text-2xl">
        {post.title} (#{post.id})
      </h1>
      <p>{post.body}</p>
      <p>Views: {post.views.toString()}</p>
      {post.userId === session?.user.id && (
        <Button onClick={() => router.push(`/posts/${post.id}/update`)}>
          Edit
        </Button>
      )}
      <p>{post.comments.length} Comments:</p>
      {session && (
        <Button onClick={() => setComments(!comments)}>Comment</Button>
      )}
      {comments && <CreateComment postId={postId} refetch={refetch} />}
      <ul>
        {post.comments.map(({ id, body, user }) => (
          <li key={id}>
            <CommentsList body={body} user={user} />
          </li>
        ))}
      </ul>
    </article>
  )
}

export default PostPage
