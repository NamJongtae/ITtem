import mongoose, { Model } from "mongoose";

interface returnPurchaseRejectDB {
  tradingId: string;
  buyerId: string;
  sellerId: string;
  productId: string;
  returnStartDate: Date;
  rejectReason: string;
  returnEndDate: Date;
}

interface returnPurchaseRejectDBModel extends Model<returnPurchaseRejectDB> {}

export const returnPurchaseRejectSchema =
  new mongoose.Schema<returnPurchaseRejectDB>(
    {
      tradingId: { type: String, required: [true, "거래 ID가 없어요."] },
      buyerId: { type: String, required: [true, "구매자 ID가 없어요."] },
      sellerId: { type: String, required: [true, "판매자 ID가 없어요."] },
      productId: { type: String, required: [true, "상품 ID가 없어요."] },
      rejectReason: {
        type: String,
        require: [true, "반품 거부 사유가 없어요."],
      },
      returnStartDate: {
        type: Date,
        required: [true, "반품 시작일이 없어요."],
      },
      returnEndDate: { type: Date, required: false, default: Date.now },
    },
    { collection: "returnPurchaseReject" }
  );

const ReturnPurchaseReject =
  mongoose.models?.ReturnPurchaseReject ||
  mongoose.model<returnPurchaseRejectDB, returnPurchaseRejectDBModel>(
    "ReturnPurchaseReject",
    returnPurchaseRejectSchema
  );

export default ReturnPurchaseReject;
