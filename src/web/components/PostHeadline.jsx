import Link from "@/web/components/ui/Link"

const PostHeadline = ({ id, title, body }) => (
  <article className="flex flex-col gap-2">
    <Link
      href={`/posts/${id}`}
      className="border border-sky-700 rounded-s-md p-4 hover:bg-sky-700 hover:text-white transition-colors duration-300 ease-in-out w-full"
    >
      <h1 className="text-2xl">{title}</h1>
      <p>{body.split(/\s+/u).slice(0, 7).join(" ")}...</p>
    </Link>
  </article>
)

export default PostHeadline
