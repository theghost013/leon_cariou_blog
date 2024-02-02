import { pageValidator } from "@/utils/validators"
import PostHeadline from "@/web/components/PostHeadline"
import Pagination from "@/web/components/ui/Pagination"
import config from "@/web/config"
import { readResource } from "@/web/services/apiClient"
import { useQuery } from "@tanstack/react-query"

export const getServerSideProps = ({ query: { page } }) => ({
  props: {
    page: pageValidator.validateSync(page),
  },
})
const IndexPage = (props) => {
  const { page } = props
  const {
    isLoading,
    data: { data: { result: posts, meta: { count } = {} } = {} } = {},
  } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => readResource("posts", { params: { page } }),
  })
  const countPages = Math.ceil(count / config.pagination.limit)

  // eslint-disable-next-line no-console
  console.log("posts", posts)

  if (isLoading || !posts) {
    return <div className="text-center p-32 animate-bounce">Loading...</div>
  }

  return (
    <div className="py-4 flex flex-col gap-16">
      <ul className="flex flex-col gap-8">
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
