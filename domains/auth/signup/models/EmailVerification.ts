import mongoose, { Schema, InferSchemaType, Model } from "mongoose";

const EmailVerificationSchema = new Schema(
  {
    email: { type: String, required: true, index: true },
    type: {
      type: String,
      required: true,
      enum: ["signup", "resetPw"],
      index: true
    },
    verificationCodeHash: { type: String, required: true },
    count: { type: Number, required: true, default: 1 },
    isVerified: { type: Boolean, required: true, default: false },
    expiresAt: { type: Date, required: true, index: true }
  },
  { timestamps: true }
);

EmailVerificationSchema.index({ email: 1, type: 1 }, { unique: true });

EmailVerificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export type EmailVerificationDoc = InferSchemaType<
  typeof EmailVerificationSchema
>;

export default (mongoose.models
  .EmailVerification as Model<EmailVerificationDoc>) ||
  mongoose.model<EmailVerificationDoc>(
    "EmailVerification",
    EmailVerificationSchema
  );
