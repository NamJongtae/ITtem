import dbConnect from "@/lib/db";
import Product from "@/lib/db/models/Product";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { cursor, limit } = req.query;

      await dbConnect();

      const pageLimit = parseInt(limit as string, 10) || 10;

      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);

      const todayEnd = new Date();
      todayEnd.setHours(23, 59, 59, 999);

      const cursorDate = cursor ? new Date(cursor as string) : todayEnd;

      const products = await Product.find({
        createdAt: { $gte: todayStart, $lt: cursorDate },
        block: false,
      })
        .select(
          "_id name description uid createdAt status block imgData price location sellType category"
        )
        .limit(pageLimit)
        .sort({ createdAt: -1, _id: -1 });

      res.status(200).json({ message: "상품 조회에 성공했어요.", products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "상품 조회에 실패했어요.\n잠시 후 다시 시도해주세요" });
    }
  }
}
