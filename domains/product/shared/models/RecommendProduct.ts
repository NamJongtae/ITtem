import mongoose, { Schema } from "mongoose";

const RecommendProductSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: true
    }
  },
  { versionKey: false }
);

export default mongoose.models.RecommendProduct ||
  mongoose.model("RecommendProduct", RecommendProductSchema);
