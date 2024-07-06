import User from "@/lib/db/models/User";
import mongoose from "mongoose";
import { checkAuthorization } from "@/lib/server";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from '@/lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const isValidAuth = await checkAuthorization(req, res);

      if (!isValidAuth.isValid) {
        res.status(401).json({
          message: isValidAuth.message,
        });
        return;
      }

      const myUid = isValidAuth?.auth?.uid;

      await dbConnect();
      
      const user = await User.findOne({
        _id: new mongoose.Types.ObjectId(myUid),
      });

      res.status(200).json({
        message: "유저정보를 성공적으로 불러왔어요.",
        user: {
          uid: user._id,
          nickname: user.nickname,
          profileImg: user.profileImg,
          email: user.email,
        },
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          message: "유저 인증에 실패했어요.\n잠시 후 다시 시도해주세요.",
        });
    }
  }
}
