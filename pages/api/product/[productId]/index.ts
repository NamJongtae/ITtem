import { DBClient } from "@/lib/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { productId } = req.query;

      if (!productId || productId === "") {
        res.status(422).json({ message: "상품 id가 유효하지 않아요." });
        return;
      }
      await DBClient.connect();
      const db = DBClient.db("ITtem");
      const product = await db.collection("product").findOne({ id: productId });

      if (!product) {
        res.status(404).json({ message: "상품이 존재하지 않아요." });
        return;
      }

      res.status(200).json({ message: "상품 조회에 성공했어요.", product });
    } catch (error) {
      res.status(500).json({ message: "상품 조회에 실패했어요.\n잠시 후 다시 시도해주세요." });
    } finally {
      await DBClient.close();
    }
  }
}
