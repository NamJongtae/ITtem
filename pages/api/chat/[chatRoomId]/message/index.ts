import { sendToChatMessage } from "@/lib/api/firebase";
import { checkAuthorization } from "@/lib/server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { message } = req.body;
      const { chatRoomId } = req.query;

      if (!chatRoomId) {
        res.status(422).json({ message: "채팅방 ID가 없어요." });
        return;
      }

      if (!message) {
        res.status(422).json({ message: "전송할 메세지가 없어요." });
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

      await sendToChatMessage({
        myUid: myUid as string,
        message,
        chatRoomId: chatRoomId as string,
      });
      res.status(201).json({ message: "메세지 전송에 성공했어요." });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        if (error.message === "존재하지 않는 채팅방이에요.") {
          res.status(404).json({ message: error.message });
          return;
        }
        if (error.message === "잘못된 접근이에요.") {
          res.status(403).json({ message: error.message });
          return;
        }
      }
      res.status(500).json({
        message: "메세지 전송에 실패했어요.\n잠시 후 다시 시도해주세요.",
      });
    }
  }
}
