import { DBClient } from "@/lib/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { productData } = req.body;

      console.log(productData);

      if (!productData) {
        res.status(422).json({ message: "상품 데이터가 없어요." });
        return;
      }

      await DBClient.connect();
      const db = DBClient.db("ITtem");
      await db.collection("product").insertOne(productData);

      res.status(201).json({ message: "상품 등록에 성공했어요.", productData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "상품 등록에 실패하였어요." });
    } finally {
      await DBClient.close();
    }
  }
}
