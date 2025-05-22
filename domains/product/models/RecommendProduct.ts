import mongoose from "mongoose";

const RecommendProduct = new mongoose.Schema({
  name: String,
  description: String,
  uid: String,
  createdAt: Date,
  status: String,
  block: Boolean,
  imgData: Object,
  price: Number,
  location: String,
  sellType: String,
  category: String
});

export default mongoose.models.RecommendProduct ||
  mongoose.model("RecommendProduct", RecommendProduct);
