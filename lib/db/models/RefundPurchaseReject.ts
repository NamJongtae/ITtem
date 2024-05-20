import mongoose from "mongoose";

export const refundPurchaseRejectSchema = new mongoose.Schema(
  {
    tradingId: { type: String, required: [true, "거래 ID가 없어요."] },
    buyer: { type: String, required: [true, "구매자 ID가 없어요."] },
    seller: { type: String, required: [true, "판매자 ID가 없어요."] },
    productId: { type: String, required: [true, "상품 ID가 없어요."] },
    refundStartDate: { type: Date, required: [true, "환불 시작일이 없어요."] },
    rejectReason: { type: String, require: [true, "환불 거부 사유가 없어요."] },
    refundEndDate: { type: Date, required: false, default: Date.now },
  },
  { collection: "refundPurchaseReject" }
);

const RefundPurchaseReject =
  mongoose.models?.RefundPurchaseReject ||
  mongoose.model("RefundPurchaseReject", refundPurchaseRejectSchema);

export default RefundPurchaseReject;
