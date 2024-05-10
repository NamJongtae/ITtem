import mongoose from "mongoose";

export const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "상품명이 없어요."] },
    description: { type: String, required: [true, "상품 설명이 없어요."] },
    uid: { type: String, required: [true, "유저 아이디가 없어요."] },
    createdAt: { type: Date, default: Date.now },
    status: { type: String, default: "sold" },
    block: { type: Boolean, default: false },
    reportCount: { type: Number, default: 0 },
    reportUserIds: { type: [String], default: [] },
    wishCount: { type: Number, default: 0 },
    wishUserIds: { type: [String], default: [] },
    viewCount: { type: Number, default: 0 },
    imgData: {
      type: [{ url: String, name: String }],
      required: [true, "상품 이미지가 없어요."],
    },
    price: { type: Number, required: [true, "가격이 입력되지 않았어요."] },
    location: {
      type: String,
      required: [true, "거래지역이 선택되지 않았어요."],
    },
    sellType: {
      type: String,
      required: [true, "판매유형이 선택되지 않았어요."],
    },
    category: {
      type: String,
      required: [true, "카테고리가 선택되지 않았어요."],
    },
    condition: {
      type: String,
      required: [true, "상품 상태가 선택되지 않았어요."],
    },
    returnPolicy: {
      type: String,
      required: [true, "반품 여부가 선택되지 않았어요."],
    },
    transaction: {
      type: String,
      required: [true, "거래 방식이 선택되지 않았어요."],
    },
    deliveryFee: {
      type: String,
      required: [true, "배송비 여부가 선택되지 않았어요."],
    },
  },
  { collection: "products" }
);

const Product =
  mongoose.models?.Product || mongoose.model("Product", productSchema);

  export default Product
