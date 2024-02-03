import BaseModel from "@/db/models/BaseModel"
import UserModel from "@/db/models/UserModel"
import CommentModel from "@/db/models/CommentModel"

class PostModel extends BaseModel {
  static tableName = "posts"
  static get relationMappings() {
    return {
      user: {
        modelClass: UserModel,
        relation: BaseModel.BelongsToOneRelation,
        join: {
          from: "posts.userId",
          to: "users.id",
        },
      },
      comments: {
        modelClass: CommentModel,
        relation: BaseModel.HasManyRelation,
        join: {
          from: "posts.id",
          to: "comments.postId",
        },
        user: {
          modelClass: UserModel,
          relation: BaseModel.BelongsToOneRelation,
          join: {
            from: "comments.userId",
            to: "users.id",
          },
        },
      },
    }
  }
}

export default PostModel
