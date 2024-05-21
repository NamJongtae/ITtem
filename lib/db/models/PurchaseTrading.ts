import {
  PurchaseTradingProcess,
  TradingStatus,
} from "@/types/productTypes";
import mongoose from "mongoose";

export const purchaseTradingSchema = new mongoose.Schema(
  {
    buyer: { type: String, required: [true, "구매자 ID가 없어요."] },
    productId: { type: String, required: [true, "상품 ID가 없어요."] },
    purchaseStartDate: { type: Date, required: false, default: Date.now },
    purchaseEndDate: { type: Date, required: false},
    status: { type: String, required: false, default: TradingStatus.TRADING },
    process: {
      type: String,
      required: false,
      default: PurchaseTradingProcess.판매자확인중,
    },
    cancelReason: { type:String, required: false},
    cancelStartDate: { type: Date, required: false },
    cancelEndDate: { type: Date, required: false },
    returnReason: { type:String, required: false},
    returnStartDate: { type: Date, required: false },
    returnEndDate: { type: Date, required: false },
  },
  { collection: "purchaseTrading" }
);

const PurchaseTrading =
  mongoose.models?.PurchaseTrading ||
  mongoose.model("PurchaseTrading", purchaseTradingSchema);

export default PurchaseTrading;
