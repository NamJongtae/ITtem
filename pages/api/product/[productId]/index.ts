import { ERROR_MESSAGE } from "@/constants/constant";
import { DBClient } from "@/lib/database";
import { checkAuthorization } from "@/lib/server";
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
      res.status(500).json({
        message: ERROR_MESSAGE,
      });
    } finally {
      await DBClient.close();
    }
  }

  if (req.method === "PATCH") {
    try {
      const isValidAuth = await checkAuthorization(req, res);
      if (!isValidAuth.isValid) {
        res.status(401).json({
          message: isValidAuth.message,
        });
        return;
      }
      const { productId } = req.query;
      const { productData } = req.body;

      console.log(productData);
      
      await DBClient.connect();
      const db = DBClient.db("ITtem");
      const result = await db
        .collection("product")
        .findOneAndUpdate(
          { id: productId },
          { $set: productData },
          { returnDocument: "after" }
        );
      if (!result) {
        res.status(500).json({ message: "상품 수정에 실패했어요." });
        return;
      }
      res
        .status(200)
        .json({ message: "상품 수정에 성공했어요.", product: result });
    } catch (error) {
      res.status(500).json({ message: ERROR_MESSAGE });
    } finally {
      await DBClient.close();
    }
  }
}
