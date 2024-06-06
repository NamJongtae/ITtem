import { startChat } from "@/lib/api/firebase";
import dbConnect from "@/lib/db";
import User from "@/lib/db/models/User";
import { checkAuthorization } from "@/lib/server";
import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { productId, userId } = req.body;

      if (!productId) {
        res.status(422).json({ message: "상품 ID가 없어요." });
        return;
      }

      if (!userId) {
        res.status(422).json({ message: "유저 ID가 없어요." });
        return;
      }

      const isValidAuth = await checkAuthorization(req, res);

      if (!isValidAuth.isValid) {
        res.status(401).json({
          message: isValidAuth.message,
        });
        return;
      }

      const myUid = isValidAuth?.auth?.uid;

      if (!myUid) {
        res.status(400).json({
          message: "유저 ID가 없어요.",
        });
        return;
      }

      const addChatRoomId = async (chatRoomId: string) => {
        try {
          await dbConnect();

          const myProfile = await User.updateOne(
            {
              _id: new mongoose.Types.ObjectId(myUid),
            },
            { $push: { chatRoomIds: chatRoomId  } }
          );

          if (!myProfile.acknowledged || myProfile.modifiedCount === 0) {
            throw new Error("유저 프로필 채팅방 추가에 실패했어요.");
          }
        } catch (error) {
          throw error;
        }
      };

      const chatRoomId = await startChat({
        productId,
        myUid,
        userId,
        addChatRoomId,
      });

      res
        .status(201)
        .json({ message: "채팅방 조회에 성공했어요.", chatRoomId });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "채팅방 조회에 실패했어요.\n잠시 후 다시 시도해주세요.",
      });
    }
  }
}
