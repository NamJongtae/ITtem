import {
  deleteAllNotificationMessage,
  getNotificationMessage,
  readAllNotificationMessage,
} from "@/lib/api/firebase";
import { checkAuthorization } from "@/lib/server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { lastKey, limit } = req.query;

      const currentLimit = limit ? parseInt(limit as string, 10) : 10;

      const isValidAuth = await checkAuthorization(req, res);

      if (!isValidAuth.isValid) {
        res.status(401).json({
          message: isValidAuth.message,
        });
        return;
      }

      const myUid = isValidAuth?.auth?.uid;

      if (!myUid) {
        res.status(400).json({ message: "유저 ID가 존재하지 않아요." });
        return;
      }

      const { messages, nextKey } = await getNotificationMessage({
        userId: myUid,
        lastKey,
        limit: currentLimit,
      });

      res.status(200).json({
        message: "알림 메세지 조회에 성공했어요.",
        messages,
        nextKey,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "알림 메세지 조회에 실패했어요.\n잠시 후 다시 시도해주세요.",
      });
    }
  }
  if (req.method === "PATCH") {
    try {
      const { endKey } = req.body;

      if (!endKey) {
        res.status(422).json({ message: "읽음 처리할 범위 키가 없어요." });
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
        res.status(400).json({ message: "유저 ID가 존재하지 않아요." });
        return;
      }

      await readAllNotificationMessage({ userId: myUid, endKey });

      res.status(200).json({ message: "알림 메세지 읽음 처리에 성공했어요." });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message:
          "알림 메세지 읽음 처리에 실패했어요.\n잠시 후 다시 시도해주세요.",
      });
    }
  }
  if (req.method === "DELETE") {
    try {
      const { endKey } = req.body;

      if (!endKey) {
        res.status(422).json({ message: "삭제 처리할 범위 키가 없어요." });
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
        res.status(400).json({ message: "유저 ID가 존재하지 않아요." });
        return;
      }

      await deleteAllNotificationMessage({ userId: myUid, endKey });

      res.status(200).json({
        message: "알림 메세지 삭제에 성공했어요.",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "알림 메세지 삭제에 실패했어요.\n잠시 후 다시 시도해주세요.",
      });
    }
  }
}
