import { SalesTradingProcess, TradingStatus } from "@/types/productTypes";
import mongoose from "mongoose";

export const salesTradingSchema = new mongoose.Schema(
  {
    seller: { type: String, required: [true, "판매자 ID가 없어요."] },
    productId: { type: String, required: [true, "상품 ID가 없어요."] },
    saleStartDate: { type: Date, required: false, default: Date.now },
    saleEndDate: { type: Date, required: false },
    status: { type: String, required: false, default: TradingStatus.TRADING },
    process: {
      type: String,
      required: false,
      default: SalesTradingProcess.판매중,
    },
    cancelReason: { type:String, required: false},
    cancelStartDate: { type: Date, required: false },
    cancelEndDate: { type: Date, required: false },
    refundReason: { type:String, required: false},
    refundStartDate: { type: Date, required: false },
    refundEndDate: { type: Date, required: false },
  },
  { collection: "salesTrading" }
);

const SalesTrading =
  mongoose.models?.SalesOrder ||
  mongoose.model("SalesOrder", salesTradingSchema);

export default SalesTrading;
