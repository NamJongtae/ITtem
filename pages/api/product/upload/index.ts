import { DBClient } from "@/lib/database";
import { checkAuthorization } from "@/lib/server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const isValidAuth = await checkAuthorization(req, res);

      if (!isValidAuth.isValid) {
        res.status(401).json({
          message: isValidAuth.message,
        });
        return;
      }

      const { productData } = req.body;

      if (!productData) {
        res.status(422).json({ message: "상품 데이터가 없어요." });
        return;
      }
      const uploadProductData = { ...productData, createdAt: new Date() };
      await DBClient.connect();
      const db = DBClient.db("ITtem");
      await db.collection("product").insertOne(uploadProductData);

      res
        .status(201)
        .json({
          message: "상품 등록에 성공했어요.",
          product: uploadProductData,
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "상품 등록에 실패하였어요." });
    } finally {
      await DBClient.close();
    }
  }
}
