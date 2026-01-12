import mongoose, { Model, Schema, Types } from "mongoose";

export interface WishDB {
  userId: Types.ObjectId;
  productId: Types.ObjectId;
  createdAt: Date;
}

const wishSchema = new Schema<WishDB>(
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
    collection: "wishes",
    timestamps: true,
    versionKey: false
  }
);

/**
 * 같은 유저의 동일 상품 중복 찜 방지
 */
wishSchema.index({ userId: 1, productId: 1 }, { unique: true });


const Wish: Model<WishDB> =
  mongoose.models.Wish || mongoose.model<WishDB>("Wish", wishSchema);

export default Wish;
