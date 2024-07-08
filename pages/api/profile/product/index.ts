import dbConnect from "@/lib/db";
import Product from "@/lib/db/models/Product";
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

      if (!productIds) {
        res.status(422).json({ message: "유저 상품 ID 목록이 없어요." });
        return;
      }

      await dbConnect();

      const todayStart = new Date();
      const cursorDate = cursor ? new Date(cursor as string) : todayStart;
      const pageLimit = parseInt(limit as string, 10) || 10;
      const objectIdArray = productIds.map(
        (id: string) => new mongoose.Types.ObjectId(id)
      );

      let query: object = {
        _id: { $in: objectIdArray },
        createdAt: { $lt: cursorDate },
        block: false,
      };

      query = category !== "전체" ? { ...query, category } : query;

      const products = await Product.find(query)
        .select(
          "_id name description uid createdAt status block imgData price location sellType category"
        )
        .limit(pageLimit)
        .sort({ createdAt: -1, _id: -1 });

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
