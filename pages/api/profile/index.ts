import dbConnect from "@/lib/db";
import { User } from "@/lib/db/schema";
import { checkAuthorization } from "@/lib/server";
import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnect();

    const isValidAuth = await checkAuthorization(req, res);

    if (!isValidAuth.isValid) {
      res.status(401).json({
        message: isValidAuth.message,
      });
      return;
    }
    const myUid = isValidAuth.auth.uid as string;

    const profile = await User.findOne({
      _id: new mongoose.Types.ObjectId(myUid),
    });

    if (!profile) {
      res.status(404).json({
        message: "유저가 존재하지 않습니다.\n로그인 정보를 확인해주세요.",
      });
      return;
    }

    let profileData = { ...profile._doc, uid: profile._id };
    delete profileData.password;
    delete profileData.__v;
    delete profileData.loginType;
    delete profileData._id;

    res.status(200).json({
      message: "프로필 조회에 성공했어요.",
      profile: profileData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "프로필 조회에 실패했어요.\n잠시 후 다시 시도해주세요.",
    });
  }
}
