import config from "@/api/config"
import BaseModel from "@/db/models/BaseModel"
import UserModel from "@/db/models/UserModel"
import PostModel from "@/db/models/PostModel"
import CommentModel from "@/db/models/CommentModel"
import knex from "knex"

export const createContext = ({ req, res, next }) => {
  const send = (result, meta = {}) => {
    res.send({
      result: Array.isArray(result) ? result : [result],
      meta,
    })
  }
  const db = knex(config.db)

  BaseModel.knex(db)

  return {
    req,
    res,
    next,
    send,
    db,
    models: {
      UserModel,
      PostModel,
      CommentModel,
    },
    data: {},
  }
}
