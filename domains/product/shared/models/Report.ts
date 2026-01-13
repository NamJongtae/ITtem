import mongoose, { Model, Schema, Types } from "mongoose";

export interface ReportDB {
  userId: Types.ObjectId;
  productId: Types.ObjectId;
  createdAt: Date;
}

const reportSchema = new Schema<ReportDB>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true
    }
  },
  {
    collection: "reports",
    timestamps: true
  }
);

/**
 * 같은 유저의 동일 상품 중복 신고 방지
 */
reportSchema.index({ userId: 1, productId: 1 }, { unique: true });

const Report: Model<ReportDB> =
  mongoose.models.Report || mongoose.model<ReportDB>("Report", reportSchema);

export default Report;
