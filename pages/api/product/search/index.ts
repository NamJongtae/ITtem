import { DBClient } from "@/lib/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { page, limit, category, keyword } = req.query;
      await DBClient.connect();
      const db = DBClient.db("ITtem");

      const currentPage = parseInt(page as string) || 1;
      const currentLimit = parseInt(limit as string) || 10;
      const skip = (currentPage - 1) * currentLimit;

      let query = {};
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

      const product = await db
        .collection("product")
        .find(query)
        .skip(skip)
        .limit(currentLimit)
        .sort({ createdAt: -1 })
        .toArray();

      res.status(200).json({ message: "검색에 성공했어요.", product });

      if (!keyword) {
        res.status(422).json({ message: "검색어가 존재하지 않아요." });
        return;
      }

      if (!product.length) {
        res.status(404).json({ message: "상품이 존재하지 않아요." });
        return;
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "검색에 실패했어요." });
    } finally {
      await DBClient.close();
    }
  }
}
