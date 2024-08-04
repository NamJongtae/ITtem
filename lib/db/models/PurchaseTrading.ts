import { PurchaseTradingProcess, TradingStatus } from "@/types/productTypes";
import mongoose, { Model } from "mongoose";

interface PurchaseTradingDB {
  sellerId: string;
  buyerId: string;
  productId: string;
  productName: string;
  productPrice: number;
  productImg: string;
  purchaseStartDate: Date;
  purchaseEndDate: Date;
  status: TradingStatus;
  process: PurchaseTradingProcess;
  cancelReason: string;
  cancelStartDate: Date;
  cancelEndDate: Date;
  returnReason: string;
  returnStartDate: Date;
  returnEndDate: Date;
  isReviewed: Boolean;
  cancelRejectDate: Date;
  returnRejectDate: Date;
  cancelRejectReason: string;
  returnRejectReason: string;
}

interface PurchaseTradingDBModel extends Model<PurchaseTradingDB> {}

export const purchaseTradingSchema = new mongoose.Schema<PurchaseTradingDB>(
  {
    sellerId: { type: String, required: [true, "판매자 ID가 없어요."] },
    buyerId: { type: String, required: [true, "구매자 ID가 없어요."] },
    productId: { type: String, required: [true, "상품 ID가 없어요."] },
    productPrice: { type: Number, require: [true, "상품 가격이 없어요"] },
    productImg: { type: String, require: [true, "상품 이미지가 없어요"] },
    productName: { type: String, required: [true, "상품명이 없어요."] },
    purchaseStartDate: { type: Date, required: false, default: Date.now },
    purchaseEndDate: { type: Date, required: false },
    status: { type: String, required: false, default: TradingStatus.TRADING },
    process: {
      type: String,
      required: false,
      default: PurchaseTradingProcess.판매자확인중,
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
    isReviewed: { type: Boolean, required: false, default: false },
  },
  { collection: "purchaseTrading" }
);

const PurchaseTrading =
  mongoose.models?.PurchaseTrading ||
  mongoose.model<PurchaseTradingDB, PurchaseTradingDBModel>(
    "PurchaseTrading",
    purchaseTradingSchema
  );

export default PurchaseTrading;
