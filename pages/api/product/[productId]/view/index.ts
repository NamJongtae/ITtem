import dbConnect from "@/lib/db";
import Product from "@/lib/db/models/Product";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PATCH") {
    try {
      const { productId } = req.query;

      await dbConnect();

      if (!productId) {
        res.status(422).json({ message: "상품 ID가 존재하지 않아요." });
        return;
      }

      const product = await Product.findOneAndUpdate(
        {
          _id: new mongoose.Types.ObjectId(productId as string),
        },
        {
          $inc: { viewCount: 1 },
        },
        { returnNewDocument: true }
      );

      if (!product) {
        res.status(404).json({ message: "상품이 존재하지 않아요." });
        return;
      }

      res.status(200).json({
        message: "조회수 갱신에 성공했어요.",
        viewCount: product.viewCount,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "조회수 갱신에 실패했어요." });
    }
  } else {
    res.status(405).json({ message: "잘못된 접근이에요." });
  }
}
