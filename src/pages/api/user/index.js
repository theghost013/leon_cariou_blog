import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import hashPassword from "@/db/hashPassword"
import { AVERAGE_PASSWORD_HASHING_DURATION } from "@/pages/api/constants"
import sleep from "@/utils/sleep"
import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from "@/utils/validators"

const handle = mw({
  POST: [
    validate({
      body: {
        username: nameValidator.required(),
        email: emailValidator.required(),
        password: passwordValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        body: { email, password, username },
      },
      models: { UserModel },
    }) => {
      const user = await UserModel.query().findOne({ email })

      if (user) {
        await sleep(AVERAGE_PASSWORD_HASHING_DURATION)

        send(true)

        return
      }

      const [passwordHash, passwordSalt] = await hashPassword(password)

      await UserModel.query().insert({
        email,
        passwordHash,
        passwordSalt,
        username,
      })

      send(true)
    },
  ],
})

export default handle
