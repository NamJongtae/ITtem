import mongoose from "mongoose";

export const reviewSchema = new mongoose.Schema(
  {
    reviewScore: { type: Number, required: [true, "리뷰 점수가 없어요."] },
    productId: { type: String, required: [true, "상품 ID가 없어요."] },
    content: { type: String, required: [true, "리뷰 내용이 없어요."] },
    seller: { type: String, required: [true, "판매자 ID가 없어요."] },
    buyer: { type: String, required: [true, "구매자 ID가 없어요."] },
    tags: { type: [Number], required: false, default: [0, 0, 0, 0, 0] },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "reviews" }
);

const Review =
  mongoose.models?.Review || mongoose.model("Review", reviewSchema);

export default Review;
