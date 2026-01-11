import mongoose, { Model, Schema, Types } from "mongoose";

export interface FollowDB {
  followerId: Types.ObjectId; // 나 (팔로우 하는 쪽)
  followingId: Types.ObjectId; // 상대 (팔로우 당하는 쪽)
  createdAt: Date;
  updatedAt: Date;
}

const followSchema = new Schema<FollowDB>(
  {
    followerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    followingId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    }
  },
  {
    collection: "follows",
    timestamps: true,
    versionKey: false
  }
);

/**
 * 같은 유저 중복 팔로우 방지
 */
followSchema.index({ followerId: 1, followingId: 1 }, { unique: true });

/**
 * 자기 자신 팔로우 방지
 */
followSchema.pre("save", function (next) {
  if (this.followerId.equals(this.followingId)) {
    return next(new Error("자기 자신을 팔로우할 수 없습니다."));
  }
  next();
});

const Follow: Model<FollowDB> =
  mongoose.models.Follow || mongoose.model<FollowDB>("Follow", followSchema);

export default Follow;
