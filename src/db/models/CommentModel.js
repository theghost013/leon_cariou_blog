import BaseModel from "@/db/models/BaseModel"
import UserModel from "@/db/models/UserModel"
import PostModel from "@/db/models/PostModel"

class CommentModel extends BaseModel {
  static tableName = "comments"
  static get relationMappings() {
    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "comments.user_id",
          to: "users.id",
        },
      },
      post: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: PostModel,
        join: {
          from: "comments.post_id",
          to: "posts.id",
        },
      },
    }
  }
}

export default CommentModel
