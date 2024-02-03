import { pageValidator } from "@/utils/validators"
import PostHeadline from "@/web/components/PostHeadline"
import ButtonLink from "@/web/components/ui/ButtonLink"
import Pagination from "@/web/components/ui/Pagination"
import config from "@/web/config"
import { readResource } from "@/web/services/apiClient"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "@/web/components/SessionContext"
import { useEffect, useState } from "react"

export const getServerSideProps = ({ query: { page } }) => ({
  props: {
    page: pageValidator.validateSync(page),
  },
})
const IndexPage = (props) => {
  const { session } = useSession()
  const [canCreate, setCanCreate] = useState(false)
  const { page } = props
  const {
    isLoading,
    data: { data: { result: posts, meta: { count } = {} } = {} } = {},
  } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => readResource("posts", { params: { page } }),
  })
  const countPages = Math.ceil(count / config.pagination.limit)

  useEffect(() => {
    if (session) {
      setCanCreate(
        session.user.role === "admin" || session.user.role === "author",
      )
    }
  }, [session])

  if (isLoading || !posts) {
    return <div className="text-center p-32 animate-bounce">Loading...</div>
  }

  return (
    <div className="py-4 flex flex-col gap-16">
      <ul className="flex flex-col gap-8">
        {canCreate && (
          <ButtonLink className="text-center" href="/posts/create">
            Create post
          </ButtonLink>
        )}
        {posts.map(({ id, title, body }) => (
          <li key={id}>
            <PostHeadline id={id} title={title} body={body} />
          </li>
        ))}
      </ul>
      <Pagination pathname="/" page={page} countPages={countPages} />
    </div>
  )
}

export default IndexPage
