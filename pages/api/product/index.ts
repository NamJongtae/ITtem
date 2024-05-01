import { DBClient } from "@/lib/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { category, page, limit, location } = req.query;
      await DBClient.connect();

      const currentPage = parseInt(page as string) || 1;
      const currentLimit = parseInt(limit as string) || 10;
      const skip = (currentPage - 1) * currentLimit;

      const db = DBClient.db("ITtem");

      let query = {};
      query = category !== "전체" ? { category } : query;
      query = location
        ? { ...query, location: new RegExp(location as string, "i") }
        : query;

      const product = await db
        .collection("product")
        .find(query)
        .skip(skip)
        .limit(currentLimit)
        .sort({ createdAt: -1 })
        .toArray();

      if (!product.length) {
        res.status(404).json({ message: "상품이 존재하지 않아요." });
        return;
      }

      res.status(200).json({ message: "상품조회에 성공했어요.", product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "상품 조회에 실패했어요." });
    } finally {
      await DBClient.close();
    }
  }
}
