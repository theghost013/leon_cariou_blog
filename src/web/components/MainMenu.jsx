import { useSession } from "@/web/components/SessionContext"
import Link from "@/web/components/ui/Link"

const MainMenu = ({ children: _, ...otherProps }) => {
  const { session, logOut } = useSession()

  return (
    <nav {...otherProps}>
      <ul className="flex gap-4">
        <li>
          <Link href="/" styless>
            Home
          </Link>
        </li>
        {session ? (
          <>
            <li>
              <Link href="/posts/create" styless>
                Create product
              </Link>
            </li>
            <li>
              <button onClick={logOut}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login" styless>
                Login
              </Link>
            </li>
            <li>
              <Link href="/register" styless>
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default MainMenu
