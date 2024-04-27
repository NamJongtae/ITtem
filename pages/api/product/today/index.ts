import { DBClient } from "@/lib/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { page, limit } = req.query;

      await DBClient.connect();
      const db = DBClient.db("ITtem");
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);

      const todayEnd = new Date();
      todayEnd.setHours(23, 59, 59, 999);

      const currentPage = parseInt(page as string) || 1;
      const currentlimit = parseInt(limit as string) || 10;

      // skip할 문서의 수를 계산합니다.
      const skip = (currentPage - 1) * currentlimit;

      const product = await db
        .collection("product")
        .find({ createdAt: { $gte: todayStart, $lt: todayEnd } })
        .skip(skip)
        .limit(currentlimit)
        .toArray();

      res.status(200).json({ message: "상품 조회에 성공했어요.", product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "상품 조회에 실패했어요." });
    } finally {
      await DBClient.close();
    }
  }
}
