import config from "@/api/config"
import BaseModel from "@/db/models/BaseModel"
import CategoryModel from "@/db/models/CategoryModel"
import ProductModel from "@/db/models/ProductModel"
import UserModel from "@/db/models/UserModel"
import knex from "knex"

export const createContext = (req, res, next) => {
  const send = (result, meta = {}) => {
    res.send({
      result: Array.isArray(result) ? result : [result],
      meta,
    })
  }
  const db = knex(config.db)

  if (config.isDevMode) {
    // eslint-disable-next-line no-console
    db.on("query", ({ sql, bindings }) => console.info({ sql, bindings }))
  }

  BaseModel.knex(db)

  return {
    req,
    res,
    next,
    send,
    db,
    models: {
      CategoryModel,
      ProductModel,
      UserModel,
    },
  }
}
