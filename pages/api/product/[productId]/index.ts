import { ERROR_MESSAGE } from "@/constants/constant";
import mongoose from "mongoose";

import { Product } from "@/lib/db/schema";
import { checkAuthorization } from "@/lib/server";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { productId } = req.query;

      if (!productId) {
        res.status(422).json({ message: "상품 아이디가 없어요." });
        return;
      }

      await dbConnect();

      const product = await Product.findOne({
        _id: new mongoose.Types.ObjectId(productId as string),
      });

      if (!product) {
        res.status(404).json({ message: "상품이 존재하지 않아요." });
        return;
      }

      res.status(200).json({ message: "상품 조회에 성공했어요.", product });
    } catch (error) {
      console.error("상품 조회 에러", error);
      res.status(500).json({
        message: ERROR_MESSAGE,
      });
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

      if (!productId) {
        res.status(422).json({ message: "상품 id가 없어요." });
        return;
      }

      if (!productData) {
        res.status(422).json({ message: "상품 수정 데이터가 없어요." });
        return;
      }

      await dbConnect();
      const result = await Product.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(productId as string) },
        { $set: productData },
        { returnNewDocument: true }
      );

      if (!result) {
        res.status(500).json({ message: "상품 수정에 실패하였습니다." });
        return;
      }

      res
        .status(200)
        .json({ message: "상품 수정에 성공했어요.", product: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "상품 수정에 실패했어요.\n잠시 후 다시 시도해주세요.",
      });
    }
  }
}
