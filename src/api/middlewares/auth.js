import config from "@/api/config"
import { HttpForbiddenError } from "@/api/errors"
import webConfig from "@/web/config"
import jsonwebtoken from "jsonwebtoken"

const auth = async ({
  req: {
    headers: { authorization },
    cookies: { [webConfig.security.session.cookie.key]: cookies },
  },
  next,
  data,
}) => {
  const cookiesJwt = jsonwebtoken.verify(cookies, config.security.jwt.secret)

  if (cookiesJwt.payload !== authorization) {
    throw new HttpForbiddenError()
  }

  data.userId = jsonwebtoken.verify(
    authorization,
    config.security.jwt.secret,
  ).payload.user.id

  await next()
}

export default auth
