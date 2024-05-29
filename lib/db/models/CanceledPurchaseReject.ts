import mongoose, { Model } from "mongoose";

interface CanceledPurchaseRejectDB {
  tradingId: string;
  buyerId: string;
  sellerId: string;
  productId: string;
  rejectReason: string;
  cancelStartDate: Date;
  cancelEndDate: Date;
}

interface CanceledPurchaseRejectDBModel
  extends Model<CanceledPurchaseRejectDB> {}

export const canceledPurchaseRejectSchema =
  new mongoose.Schema<CanceledPurchaseRejectDB>(
    {
      tradingId: { type: String, required: [true, "거래 ID가 없어요."] },
      buyerId: { type: String, required: [true, "구매자 ID가 없어요."] },
      sellerId: { type: String, required: [true, "판매자 ID가 없어요."] },
      productId: { type: String, required: [true, "상품 ID가 없어요."] },
      rejectReason: {
        type: String,
        require: [true, "취소 거부 사유가 없어요."],
      },
      cancelStartDate: {
        type: Date,
        required: [true, "취소 시작일이 없어요."],
      },

      cancelEndDate: { type: Date, required: false, default: Date.now },
    },
    { collection: "canceledPurchaseReject" }
  );

const CanceledPurchaseReject =
  mongoose.models?.CanceledPurchaseReject ||
  mongoose.model<CanceledPurchaseRejectDB, CanceledPurchaseRejectDBModel>(
    "CanceledPurchaseReject",
    canceledPurchaseRejectSchema
  );

export default CanceledPurchaseReject;
