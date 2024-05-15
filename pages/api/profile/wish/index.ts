import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import Product from "@/lib/db/models/Product";
import { checkAuthorization } from "@/lib/server";
import User from "@/lib/db/models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const isValidAuth = await checkAuthorization(req, res);

      if (!isValidAuth.isValid) {
        res.status(401).json({
          message: isValidAuth.message,
        });
        return;
      }

      const { wishProductIds } = req.body;
      const { cursor, limit } = req.query;

      if (!wishProductIds) {
        res.status(422).json({ message: "찜 목록 ID가 필요합니다." });
        return;
      }

      if (!wishProductIds.length) {
        res.status(422).json({ message: "찜 목록이 없어요." });
        return;
      }

      const pageLimit = parseInt(limit as string, 10) || 10;
      const objectIdArray = wishProductIds.map(
        (id: string) => new mongoose.Types.ObjectId(id)
      );

      let query = {
        _id: cursor
          ? {
              $in: objectIdArray,
              $gt: new mongoose.Types.ObjectId(cursor as string),
            }
          : {
              $in: objectIdArray,
            },
        block: false,
      };

      const products = await Product.find(query)
        .limit(pageLimit)
        .sort({ _id: 1 });

      if (!products.length) {
        res.status(404).json({ message: "찜 목록이 존재하지 않아요." });
        return;
      }

      res.status(200).json({ message: "찜 목록 조회에 성공했어요.", products });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "찜 목록 조회에 실패했어요.\n잠시 후 다시 시도해주세요.",
      });
    }
  }
  if (req.method === "DELETE") {
    try {
      const { wishProductIds } = req.body;

      const isValidAuth = await checkAuthorization(req, res);

      if (!isValidAuth.isValid) {
        res.status(401).json({
          message: isValidAuth.message,
        });
        return;
      }

      if (!wishProductIds || !wishProductIds.length) {
        res.status(422).json({ message: "삭제할 찜 목록 아이디가 없어요." });
        return;
      }

      const myUid = isValidAuth?.auth?.uid;

      const objectIdArray = wishProductIds.map(
        (id: string) => new mongoose.Types.ObjectId(id)
      );

      const deleteResult = await User.findOneAndUpdate(
        {
          _id: new mongoose.Types.ObjectId(myUid),
        },
        {
          $pull: { wishProductIds: { $in: objectIdArray } },
        },
        { returnNewDocument: true }
      );

      res.status(200).json({
        message: "찜 목록 삭제에 성공했어요.",
        wishProductIds: deleteResult,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "찜 목록 삭제에 실패했어요.\n잠시 후 다시 시도해주세요.",
      });
    }
  }
}
