import { useRouter } from "next/router"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "@/web/components/SessionContext"
import { readResource } from "@/web/services/apiClient"
import Button from "@/web/components/ui/Button"
import Link from "@/web/components/ui/Link"

const UserAdminPage = () => {
  const { session } = useSession()
  const router = useRouter()
  const {
    query: { userId },
  } = useRouter()
  const { isLoading, data: { data: { result: [user] = [] } = {} } = {} } =
    useQuery({
      queryKey: ["user"],
      queryFn: () => readResource(`users/${userId}`),
      enabled: Boolean(userId),
      initialData: { data: {} },
    })

  if (!session || session.user.role !== "admin") {
    return <p>You are not allowed to access this page</p>
  }

  if (isLoading && !user) {
    return "Loading..."
  }

  if (!user && !isLoading) {
    return "User not found"
  }

  return (
    <article className="flex flex-col gap-3">
      <h1 className="text-2xl">
        {user.username} #{user.id}
      </h1>
      <p>{user.email}</p>
      <p>{user.role}</p>
      <p>{user.created_at}</p>
      <p>is Active: {user.isActive ? "yes" : "no"}</p>
      <Button
        as={Link}
        href={`/admin/user/${user.id}/update`}
        className="text-center w-16"
      >
        Edit
      </Button>
    </article>
  )
}

export default UserAdminPage
