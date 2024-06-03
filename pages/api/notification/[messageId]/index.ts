import { deleteNotificationMessage } from '@/lib/api/firebase';
import { checkAuthorization } from '@/lib/server';
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    try {
      const { messageId } = req.query;
      const isValidAuth = await checkAuthorization(req, res);

      if (!isValidAuth.isValid) {
        res.status(401).json({
          message: isValidAuth.message,
        });
        return;
      }

      const myUid = isValidAuth?.auth?.uid;

      if (!myUid) {
        res.status(403).json({ message: "유저 ID가 존재하지 않아요." });
        return;
      }

      await deleteNotificationMessage({
        userId: myUid,
        messageId: messageId as string,
      });

      res.status(200).json({ message: "메세지 삭제에 성공했어요." });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "메세지 삭제에 실패했어요.\n잠시 후 다시 시도해주세요.",
      });
    }
  }
}
