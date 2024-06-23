import { exitChatRoom } from "@/lib/api/firebase";
import { checkAuthorization } from "@/lib/server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PATCH") {
    try {
      const { chatRoomId } = req.query;

      if (!chatRoomId) {
        res.status(422).json({ message: "채팅방 ID가 없어요." });
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

      await exitChatRoom({ myUid, chatRoomId: chatRoomId as string });
      res.status(200).json({ message: "채팅방 나가기에 성공했어요." });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        if (error.message === "존재하지 않는 채팅방이에요.") {
          res.status(404).json({ message: error.message });
          return;
        } else if (error.message === "잘못된 접근이에요.") {
          res.status(400).json({ message: error.message });
          return;
        }
      }
      res
        .status(500)
        .json("채팅방 나가기에 실패했어요.\n잠시 후 다시 시도해주세요.");
    }
  }
}
