import { SalesTradingProcess, TradingStatus } from "@/types/productTypes";
import mongoose, { Model } from "mongoose";

interface SaleTradingDB {
  sellerId: string;
  buyerId: string;
  productId: string;
  productName: string;
  saleStartDate: Date;
  saleEndDate: Date;
  status: TradingStatus;
  process: SalesTradingProcess;
  cancelReason: string;
  cancelStartDate: Date;
  cancelEndDate: Date;
  returnReason: string;
  returnStartDate: Date;
  returnEndDate: Date;
  isReviewed: Boolean;
}

interface SaleTradingDBModel extends Model<SaleTradingDB> {}

export const salesTradingSchema = new mongoose.Schema<SaleTradingDB>(
  {
    sellerId: { type: String, required: [true, "판매자 ID가 없어요."] },
    buyerId: { type: String, required: false },
    productId: { type: String, required: [true, "상품 ID가 없어요."] },
    productName: { type: String, required: [true, "상품명이 없어요."] },
    saleStartDate: { type: Date, required: [true, "상품 등록일이 없어요."] },
    saleEndDate: { type: Date, required: false },
    status: { type: String, required: false, default: TradingStatus.TRADING },
    process: {
      type: String,
      required: false,
      default: SalesTradingProcess.판매중,
    },
    cancelReason: { type: String, required: false },
    cancelStartDate: { type: Date, required: false },
    cancelEndDate: { type: Date, required: false },
    returnReason: { type: String, required: false },
    returnStartDate: { type: Date, required: false },
    returnEndDate: { type: Date, required: false },
    isReviewed: { type: Boolean, required: false, default: false },
  },
  { collection: "salesTrading" }
);

const SalesTrading =
  mongoose.models?.SalesOrder ||
  mongoose.model<SaleTradingDB, SaleTradingDBModel>(
    "SalesOrder",
    salesTradingSchema
  );

export default SalesTrading;
