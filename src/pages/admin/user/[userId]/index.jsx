import { useRouter } from "next/router"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "@/web/components/SessionContext"
import { readResource } from "@/web/services/apiClient"

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
    <article>
      <h1 className="text-2xl">
        {user.username} #{user.id}
      </h1>
      <p>{user.email}</p>
      <p>{user.role}</p>
      <p>{user.created_at}</p>
      <p>{user.updated_at}</p>
      <p>{user.isActive.toString()}</p>
      <button onClick={() => router.push(`/admin/user/${user.id}/update`)}>
        Edit
      </button>
    </article>
  )
}

export default UserAdminPage
