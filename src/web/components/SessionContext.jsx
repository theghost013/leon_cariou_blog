import config from "@/web/config"
import { createResource } from "@/web/services/apiClient"
import jsonwebtoken from "jsonwebtoken"
import { useRouter } from "next/router"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"

export const useSession = () => useContext(SessionContext)
export const SessionContextProvider = (props) => {
  const [session, setSession] = useState(null)
  const router = useRouter()
  const logIn = useCallback((jwt) => {
    localStorage.setItem(config.security.session.cookie.key, jwt)

    const { payload } = jsonwebtoken.decode(jwt)

    setSession(payload)
  }, [])
  const logOut = useCallback(async () => {
    await createResource("logout")
    localStorage.removeItem(config.security.session.cookie.key)
    setSession(null)
    router.push("/login")
  }, [router])

  useEffect(() => {
    const jwt = localStorage.getItem(config.security.session.cookie.key)

    if (!jwt) {
      return
    }

    const { payload } = jsonwebtoken.decode(jwt)

    setSession(payload)
  }, [])

  return (
    <SessionContext.Provider {...props} value={{ session, logIn, logOut }} />
  )
}
const SessionContext = createContext()

export default SessionContext
