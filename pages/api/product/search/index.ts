import dbConnect from "@/lib/db";
import Product from "@/lib/db/models/Product";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { cursor, limit, category, keyword } = req.query;

      await dbConnect();

      const todayStart = new Date();

      const cursorDate = cursor ? new Date(cursor as string) : todayStart;
      const currentLimit = parseInt(limit as string) || 10;

      let query: object = { createdAt: { $lt: cursorDate }, block: false };

      if (category !== "전체") {
        query = { ...query, category };
      }

      if (keyword) {
        const keywords = (keyword as string).split(/\s+/); // 공백을 기준으로 분리
        query = {
          ...query,
          $or: [
            { name: { $in: keywords.map((kw) => new RegExp(kw, "i")) } }, // 대소문자 구분 없이 검색
            { location: { $in: keywords.map((kw) => new RegExp(kw, "i")) } },
          ],
        };
      }

      const products = await Product.find(query)
        .limit(currentLimit)
        .sort({ createdAt: -1, _id: -1 });

      if (!keyword) {
        res.status(422).json({ message: "검색어가 존재하지 않아요." });
        return;
      }

      if (!products.length) {
        res.status(404).json({ message: "상품이 존재하지 않아요." });
        return;
      }

      res.status(200).json({ message: "검색에 성공했어요.", products });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "검색에 실패했어요." });
    }
  }
}
