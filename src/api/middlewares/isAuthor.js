import { HttpAuthenticationError } from "@/api/errors"

const isAuthor = async ({ next, data }) => {
  const { role } = data

  if (role !== "author" && role !== "admin") {
    throw new HttpAuthenticationError()
  }

  await next()
}

export default isAuthor
