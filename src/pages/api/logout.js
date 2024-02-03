import auth from "@/api/middlewares/auth"
import mw from "@/api/mw"
import genCookies from "@/api/utils/genCookies"
import webConfig from "@/web/config"
import ms from "ms"

const handle = mw({
  POST: [
    auth,
    ({ send, res }) => {
      res.setHeader(
        "set-cookie",
        genCookies({
          name: webConfig.security.session.cookie.key,
          value: "null",
          expires: Date.now() - ms("10 years"),
          path: "/",
          sameSite: "strict",
          httpOnly: true,
          secure: webConfig.security.session.cookie.secure,
        }),
      )
      send(true)
    },
  ],
})

export default handle
