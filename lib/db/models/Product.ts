import {
  ProductCategory,
  ProductCondition,
  ProductSellType,
  ProductStatus,
  ProductTransaction,
} from "@/types/product-types";
import mongoose, { Model } from "mongoose";

export interface ProductDB {
  name: string;
  description: string;
  uid: string;
  createdAt: Date;
  status: ProductStatus;
  block: boolean;
  reportCount: number;
  reportUserIds: string[];
  wishUserIds: string[];
  wishCount: number;
  viewCount: number;
  imgData: { url: string; name: string }[];
  price: number;
  location: string;
  sellType: ProductSellType;
  category: ProductCategory;
  condition: ProductCondition;
  returnPolicy: string;
  transaction: ProductTransaction;
  deliveryFee: string;
}

export const productSchema = new mongoose.Schema<ProductDB>(
  {
    name: { type: String, required: [true, "상품명이 없어요."] },
    description: { type: String, required: [true, "상품 설명이 없어요."] },
    uid: { type: String, required: [true, "유저 아이디가 없어요."] },
    createdAt: { type: Date, default: Date.now },
    status: { type: String, default: ProductStatus.sold },
    block: { type: Boolean, default: false },
    reportCount: { type: Number, default: 0 },
    reportUserIds: { type: [String], default: [] },
    wishCount: { type: Number, default: 0 },
    wishUserIds: { type: [String], default: [] },
    viewCount: { type: Number, default: 0 },
    imgData: {
      type: [{ url: String, name: String, _id: false }],
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
  mongoose.models?.Product ||
  mongoose.model<ProductDB, Model<ProductDB>>("Product", productSchema);

export default Product;
