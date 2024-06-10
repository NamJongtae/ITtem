import mongoose, { Model } from "mongoose";

interface UserDB {
  loginType: string;
  email: string;
  password: string;
  nickname: string;
  profileImg: string;
  profileImgFilename: string;
  introduce: string;
  productIds: string[];
  wishProductIds: string[];
  saleCount: number;
  purchaseCount: number;
  transactionCount: number;
  followers: string[];
  followings: string[];
  createdAt: Date;
}

interface UserDBModel extends Model<UserDB> {}

export const userSchema = new mongoose.Schema<UserDB>(
  {
    loginType: {
      type: String,
      required: [true, "로그인 유형이 없어요."],
    },
    email: {
      type: String,
      required: [true, "이메일이 없어요."],
      lowercase: true,
    },
    password: {
      type: String,
      validate: {
        validator: function (this: UserDB) {
          return this.loginType !== "Email" || !!this.password;
        },
        message: "비밀번호가 없어요.",
      },
    },
    nickname: { type: String, required: [true, "닉네임이 없어요."] },
    profileImg: { type: String, default: "/icons/user_icon.svg" },
    profileImgFilename: { type: String, default: "" },
    introduce: { type: String, default: "" },
    productIds: { type: [String], default: [] },
    wishProductIds: { type: [String], default: [] },
    saleCount: { type: Number, default: 0 },
    purchaseCount: { type: Number, default: 0 },
    transactionCount: { type: Number, default: 0 },
    followers: { type: [String], default: [] },
    followings: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "users" }
);

const User =
  mongoose.models?.User ||
  mongoose.model<UserDB, UserDBModel>("User", userSchema);

export default User;
