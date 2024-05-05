import dbConnect from "@/lib/db";
import { Product } from "@/lib/db/schema";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { category, page, limit, location } = req.query;

      await dbConnect();

      const currentPage = parseInt(page as string) || 1;
      const currentLimit = parseInt(limit as string) || 10;
      const skip = (currentPage - 1) * currentLimit;

      let query = {};
      query = category !== "전체" ? { category } : query;
      query = location
        ? { ...query, location: new RegExp(location as string, "i") }
        : query;

      const product = await Product.find(query)
        .skip(skip)
        .limit(currentLimit)
        .sort({ createdAt: -1 });

      if (!product.length) {
        res.status(404).json({ message: "상품이 존재하지 않아요." });
        return;
      }

      res.status(200).json({ message: "상품조회에 성공했어요.", product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "상품 조회에 실패했어요." });
    }
  }
}
