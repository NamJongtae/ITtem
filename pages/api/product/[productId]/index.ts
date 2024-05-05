import { ERROR_MESSAGE } from "@/constants/constant";
import mongoose from "mongoose";

import { Product } from "@/lib/db/schema";
import { checkAuthorization } from "@/lib/server";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from '@/lib/db';

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

      await dbConnect();

      const product = await Product.findOne({ id: productId });

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

      await dbConnect();
      const result = await Product
        .findOneAndUpdate({ id: productId }, { $set: productData });
      if (!result) {
        res.status(500).json({ message: "상품 수정에 실패했어요." });
        return;
      }
      res
        .status(200)
        .json({ message: "상품 수정에 성공했어요.", product: result });
    } catch (error) {
      console.error(error);
      if (error instanceof mongoose.Error.ValidationError) {
        const errorMessages = Object.values(error.errors).map(
          (err) => err.message
        );
        res.status(422).json({
          message: "유효하지 않은 값이 있어요.",
          error: errorMessages,
        });
      }
      res.status(500).json({ message: ERROR_MESSAGE });
    }
  }
}
