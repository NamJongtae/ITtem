import mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
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
      required: function () {
        return (this as any).loginType === "Email"
          ? "비밀번호가 없어요."
          : false;
      },
    },
    nickname: { type: String, required: [true, "닉네임이 없어요."] },
    profileImg: { type: String, default: "/icons/user_icon.svg" },
    profieImgFilename: { type: String, default: "" },
    introduce: { type: String, default: "" },
    productIds: { type: [String], default: [] },
    wishProductIds: { type: [String], default: [] },
    followers: { type: [String], default: [] },
    followings: { type: [String], default: [] },
    chatRoomList: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "users" }
);

const User = mongoose.models?.User || mongoose.model("User", userSchema);

export default User;
