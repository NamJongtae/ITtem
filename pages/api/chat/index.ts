import { startChat } from "@/lib/api/firebase";
import { checkAuthorization } from "@/lib/server";
import { NextApiRequest, NextApiResponse } from "next";

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

      const { chatRoomId, isExistRoom } = await startChat({
        productId,
        myUid,
        userId,
      });

      res.status(isExistRoom ? 200 : 201).json({
        message: `${
          isExistRoom
            ? "채팅방 조회에 성공했어요."
            : "채팅방 생성 및 조회에 성공했어요."
        } `,
        chatRoomId,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "채팅방 생성/조회에 실패했어요.\n잠시 후 다시 시도해주세요.",
      });
    }
  }
}
