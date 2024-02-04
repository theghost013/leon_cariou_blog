import Button from "@/web/components/ui/Button"
import Link from "next/link"
import { useMutation } from "@tanstack/react-query"
import { deleteResource } from "@/web/services/apiClient"

const UsersList = ({ refetch, id, username, email }) => {
  const { mutateAsync: deleteUser } = useMutation({
    mutationFn: () => deleteResource(`users/${id}`),
  })
  const handelDelete = async () => {
    await deleteUser()
    refetch()
  }

  return (
    <article className="flex flex-row gap-2 my-2">
      <Link
        href={`/admin/user/${id}`}
        className="border border-sky-700 rounded-s-md p-4 hover:bg-sky-700 hover:text-white transition-colors duration-300 ease-in-out w-full"
      >
        <h1 className="text-2xl">{username}</h1>
        <p>{email}</p>
      </Link>
      <Button
        variant="delete"
        className="rounded"
        onClick={() => handelDelete()}
      >
        delete
      </Button>
    </article>
  )
}

export default UsersList
