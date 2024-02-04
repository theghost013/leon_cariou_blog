import { useQuery } from "@tanstack/react-query"
import { useSession } from "@/web/components/SessionContext"
import { readResource } from "@/web/services/apiClient"
import UsersList from "@/web/components/UsersList"

const AdminPage = () => {
  const { session } = useSession()
  const {
    isLoading,
    refetch,
    data: { data: { result: users } = {} } = {},
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => readResource("users"),
  })

  if (!session || session.user.role !== "admin") {
    return <p>You are not allowed to access this page</p>
  }

  if (isLoading) {
    return "Loading..."
  }

  return (
    <article>
      <h1 className="text-2xl">All Users</h1>
      <ul>
        {users.map(({ id, username, email }) => (
          <li key={id}>
            <UsersList
              id={id}
              username={username}
              email={email}
              refetch={refetch}
            />
          </li>
        ))}
      </ul>
    </article>
  )
}

export default AdminPage
