import dbConnect from "@/lib/db";
import mongoose from "mongoose";
import { Product } from "@/lib/db/schema";
import { NextApiRequest, NextApiResponse } from "next";
import { checkAuthorization } from "@/lib/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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

      if (product.reportUserIds.includes(isValidAuth.auth.uid)) {
        res.status(409).json({ message: "이미 신고한 상품이에요." });
      }

      if (product.uid === isValidAuth.auth.uid) {
        res.status(409).json({ message: "본인 상품은 신고할 수 없어요." });
      }

      const result = await Product.updateOne({ _id: productId }, [
        {
          $set: {
            reportCount: { $add: ["$reportCount", 1] },
            block: {
              $cond: {
                if: { $gte: [{ $add: ["$reportCount", 1] }, 4] },
                then: true,
                else: "$block",
              },
            },
            reportUserIds: {
              $concatArrays: ["$reportUserIds", [isValidAuth.auth.uid]],
            },
          },
        },
      ]);

      if (!result.acknowledged || result.modifiedCount === 0) {
        res.status(500).json({
          message: "상품 신고에 실패했어요.\n잠시 후 다시 시도해주세요.",
        });
        return;
      }

      res.status(200).json({ message: "해당 상품을 신고했어요." });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "상품 신고에 실패했어요.\n잠시 후 다시 시도해주세요.",
      });
    }
  }
}
