import mongoose, { Schema, InferSchemaType, Model } from "mongoose";

const EmailVerificationBlockSchema = new Schema(
  {
    email: { type: String, required: true, index: true },
    type: { type: String, required: true, enum: ["signup", "resetPw"], index: true },
    blockedUntil: { type: Date, required: true, index: true },
  },
  { timestamps: true }
);

EmailVerificationBlockSchema.index({ email: 1, type: 1 }, { unique: true });
EmailVerificationBlockSchema.index({ blockedUntil: 1 }, { expireAfterSeconds: 0 });

export type EmailVerificationBlockDoc = InferSchemaType<typeof EmailVerificationBlockSchema>;

export default (mongoose.models.EmailVerificationBlock as Model<EmailVerificationBlockDoc>) ||
  mongoose.model<EmailVerificationBlockDoc>("EmailVerificationBlock", EmailVerificationBlockSchema);
