import { v4 as uuid } from "uuid";
import mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      unique: true,
      default: () => uuid(),
    },
    loginType: {
      type: String,
      required: [true, "로그인 유형이 없어요."],
    },
    email: {
      type: String,
      required: [true, "이메일이 없어요."],
      lowercase: true,
    },
    password: {
      type: String,
      required: function () {
        return (this as any).loginType === "Email"
          ? "비밀번호가 없어요."
          : false;
      },
    },
    nickname: { type: String, required: [true, "닉네임이 없어요."] },
    profileImg: { type: String, default: "/icons/user_icon.svg" },
    profieImgFilename: { type: String, default: "" },
    introduce: { type: String, default: "" },
    productList: { type: [String], default: [] },
    wishList: { type: [String], default: [] },
    followers: { type: [String], default: [] },
    followings: { type: [String], default: [] },
    chatRoomList: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "users" }
);

export const User = mongoose.models?.User || mongoose.model("User", userSchema);

export const productSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true, default: () => uuid() },
    name: { type: String, required: [true, "상품명이 없어요."] },
    description: { type: String, required: [true, "상품 설명이 없어요."] },
    uid: { type: String, required: [true, "유저 아이디가 없어요."] },
    createdAt: { type: Date, default: Date.now },
    status: { type: String, default: "sold" },
    block: { type: Boolean, default: false },
    reportCount: { type: Number, default: 0 },
    likeCount: { type: Number, default: 0 },
    likeUserList: { type: [String], default: [] },
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

export const Product =
  mongoose.models?.Product || mongoose.model("Product", productSchema);
