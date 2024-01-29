import jsonwebtoken from "jsonwebtoken"
import config from "@/config"
import { HttpAuthenticationError } from "@/errors"
import UserModel from "@/models/UserModel"

const isAdmin = () => async (ctx) => {
  const { req, next } = ctx
  const jwt = req.cookies[config.security.session.cookie.key]
  const { payload } = jsonwebtoken.verify(jwt, config.security.jwt.secret)
  const {
    user: { id },
  } = payload
  const user = await UserModel.query().findById(id)

  if (!user) {
    throw new HttpAuthenticationError()
  }

  if (user.role !== "admin") {
    throw new HttpAuthenticationError()
  }

  await next()
}

export default isAdmin
