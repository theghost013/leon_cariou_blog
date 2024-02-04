import Link from "next/link"

const UsersList = ({ id, username, email }) => (
  <article className="flex flex-col gap-4">
    <Link
      href={`/admin/user/${id}`}
      className="border border-sky-700 rounded-s-md p-4 hover:bg-sky-700 hover:text-white transition-colors duration-300 ease-in-out"
    >
      <h1 className="text-2xl">{username}</h1>
      <p>{email}</p>
    </Link>
  </article>
)

export default UsersList
