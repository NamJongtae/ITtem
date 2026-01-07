import mongoose, { Model } from "mongoose";

export interface SessionDB {
  sessionId: string;
  uid: mongoose.Types.ObjectId;
  expiresAt: Date;
  createdAt: Date;
}

export const sessionSchema = new mongoose.Schema<SessionDB>(
  {
    sessionId: {
      type: String,
      required: [true, "세션 ID가 없어요."],
      unique: true,
      index: true
    },
    uid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "유저 ID가 없어요."]
    },
    expiresAt: {
      type: Date,
      required: [true, "세션 만료 시간이 없어요."],
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { collection: "sessions" }
);

sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Session =
  mongoose.models?.Session ||
  mongoose.model<SessionDB, Model<SessionDB>>("Session", sessionSchema);

export default Session;
