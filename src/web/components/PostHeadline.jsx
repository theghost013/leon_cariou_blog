import Link from "@/web/components/ui/Link"

const PostHeadline = ({ id, title, body }) => (
  <article className="flex flex-col gap-4">
    <h1 className="text-2xl">
      <Link href={`/posts/${id}`}>{title}</Link>
    </h1>
    <p>{body.split(/\s+/u).slice(0, 7).join(" ")}...</p>
  </article>
)

export default PostHeadline
