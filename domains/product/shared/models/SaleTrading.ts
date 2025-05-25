import {
  SaleTradingProcess,
  TradingStatus
} from "../../manage/types/productManageTypes";
import mongoose, { Model } from "mongoose";

export interface SaleTradingDB {
  sellerId: string;
  buyerId: string;
  productId: string;
  productName: string;
  productPrice: number;
  productImg: string;
  saleStartDate: Date;
  saleEndDate: Date;
  status: TradingStatus;
  process: SaleTradingProcess;
  cancelReason: string;
  cancelStartDate: Date;
  cancelEndDate: Date;
  returnReason: string;
  returnStartDate: Date;
  returnEndDate: Date;
  cancelRejectDate: Date;
  returnRejectDate: Date;
  cancelRejectReason: string;
  returnRejectReason: string;
  isReviewed: boolean;
}

export const saleTradingSchema = new mongoose.Schema<SaleTradingDB>(
  {
    sellerId: { type: String, required: [true, "판매자 ID가 없어요."] },
    buyerId: { type: String, required: false },
    productId: { type: String, required: [true, "상품 ID가 없어요."] },
    productName: { type: String, required: [true, "상품명이 없어요."] },
    productPrice: { type: Number, require: [true, "상품 가격이 없어요"] },
    productImg: { type: String, require: [true, "상품 이미지가 없어요"] },
    saleStartDate: { type: Date, required: [true, "상품 등록일이 없어요."] },
    saleEndDate: { type: Date, required: false },
    status: { type: String, required: false, default: TradingStatus.TRADING },
    process: {
      type: String,
      required: false,
      default: SaleTradingProcess.판매중
    },
    cancelReason: { type: String, required: false },
    cancelStartDate: { type: Date, required: false },
    cancelEndDate: { type: Date, required: false },
    returnReason: { type: String, required: false },
    returnStartDate: { type: Date, required: false },
    returnEndDate: { type: Date, required: false },
    cancelRejectDate: { type: Date, required: false },
    returnRejectDate: { type: Date, required: false },
    cancelRejectReason: { type: String, required: false },
    returnRejectReason: { type: String, required: false },
    isReviewed: { type: Boolean, required: false, default: false }
  },
  { collection: "salesTrading" }
);

const SaleTrading =
  mongoose.models?.SaleTrading ||
  mongoose.model<SaleTradingDB, Model<SaleTradingDB>>(
    "SaleTrading",
    saleTradingSchema
  );

export default SaleTrading;
