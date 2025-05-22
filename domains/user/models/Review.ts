import mongoose, { Model } from "mongoose";

interface ReviewDB {
  sellerId: string;
  buyerId: string;
  reviewScore: number;
  saleTradingId: string;
  purchaseTradingId: string;
  productId: string;
  productName: string;
  reviewContent: string;
  reviewTags: number[];
  createdAt: Date;
}

export const reviewSchema = new mongoose.Schema<ReviewDB>(
  {
    sellerId: { type: String, required: [true, "판매자 ID가 없어요."] },
    buyerId: { type: String, required: [true, "구매자 ID가 없어요."] },
    reviewScore: { type: Number, required: [true, "리뷰 점수가 없어요."] },
    saleTradingId: {
      type: String,
      required: [true, "상품 판매 거래 ID가 없어요."],
    },
    purchaseTradingId: {
      type: String,
      required: [true, "상품 구매 거래 ID가 없어요."],
    },
    productId: { type: String, required: [true, "상품 ID가 없어요."] },
    productName: { type: String, required: [true, "상품명이 없어요."] },
    reviewContent: { type: String, required: [true, "리뷰 내용이 없어요."] },
    reviewTags: { type: [Number], required: [true, "리뷰 태그가 없어요."] },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "reviews" }
);

const Review =
  mongoose.models?.Review ||
  mongoose.model<ReviewDB, Model<ReviewDB>>("Review", reviewSchema);

export default Review;
