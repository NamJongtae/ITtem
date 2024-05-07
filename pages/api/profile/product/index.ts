import { Product } from "@/lib/db/schema";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { productIds } = req.body;
      const { cursor, category, limit } = req.query;

      if (!productIds.length) {
        res.status(422).json({ message: "유저 상품 아이디 목록이 없어요." });
        return;
      }

      const todayStart = new Date();
      const cursorDate = cursor ? new Date(cursor as string) : todayStart;
      const pageLimit = parseInt(limit as string, 10) || 10;
      const objectIdArray = productIds.map(
        (id: string) => new mongoose.Types.ObjectId(id)
      );

      let query: object = {
        _id: { $in: objectIdArray },
        createdAt: { $lt: cursorDate },
      };

      query = category !== "전체" ? { category } : query;


      const products = await Product.find(query)
        .limit(pageLimit)
        .sort({ createdAt: -1, _id: -1 });

      if (!products.length) {
        res.status(404).json({ message: "유저 상품 목록이 존재하지 않아요." });
        return;
      }

      res
        .status(200)
        .json({ message: "유저 상품 목록 조회에 성공했어요.", products });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message:
          "유저 상품 목록 조회에 실패했어요.\n잠시 후 다시 시도해주세요.",
      });
    }
  }
}
