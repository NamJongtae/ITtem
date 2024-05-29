import mongoose, { Model } from "mongoose";

interface ReviewScoreDB {
  uid: string;
  totalReviewCount: number;
  totalReviewScore: number;
  reviewTags: number[];
}

interface ReviewScoreModel extends Model<ReviewScoreDB> {}

export const reviewScoreSchema = new mongoose.Schema<ReviewScoreDB>(
  {
    uid: { type: String, required: [true, "유저 ID가 없어요."] },
    totalReviewCount: { type: Number, require: false, default: 0 },
    totalReviewScore: { type: Number, require: false, default: 0 },
    reviewTags: { type: [Number], required: false, default: [0, 0, 0, 0, 0] },
  },
  { collection: "reviewScores" }
);

const ReviewScore =
  mongoose.models?.ReviewScore ||
  mongoose.model<ReviewScoreDB, ReviewScoreModel>(
    "ReviewScore",
    reviewScoreSchema
  );

export default ReviewScore;
