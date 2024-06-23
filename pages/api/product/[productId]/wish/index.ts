import dbConnect from "@/lib/db";
import mongoose from "mongoose";
import Product from "@/lib/db/models/Product";
import User from "@/lib/db/models/User";
import { checkAuthorization } from "@/lib/server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PATCH") {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const isValidAuth = await checkAuthorization(req, res);

      if (!isValidAuth?.isValid) {
        res.status(401).json({
          message: isValidAuth?.message,
        });
        return;
      }

      const { productId } = req.query;

      const myUid = isValidAuth?.auth?.uid;
      
      if (!productId) {
        res.status(422).json({ message: "상품 아이디가 없어요." });
        return;
      }

      await dbConnect();

      const product = await Product.findOne({
        _id: new mongoose.Types.ObjectId(productId as string),
      });

      const user = await User.findOne({
        _id: new mongoose.Types.ObjectId(myUid),
      });

      if (!product) {
        res.status(404).json({ message: "상품이 존재하지 않아요." });
        return;
      }

      if (!user) {
        res.status(404).json({ message: "유저가 존재하지 않아요." });
        return;
      }

      if (
        product.wishUserIds.includes(myUid) &&
        user.wishProductIds.includes(product._id)
      ) {
        res.status(409).json({ message: "이미 찜한 상품이에요." });
        return;
      }

      // 유저 찜 목록에 상품 추가
      if (!user.wishProductIds.includes(product._id)) {
        const profileResult = await User.updateOne(
          {
            _id: new mongoose.Types.ObjectId(myUid),
          },
          {
            $push: {
              wishProductIds: new mongoose.Types.ObjectId(
                product._id as string
              ),
            },
          },
          { session }
        );

        if (!profileResult.acknowledged || profileResult.modifiedCount === 0) {
          throw new Error("유저 찜 목록에 상품 아이디 추가에 실패했어요.");
        }
      }

      // 상품 찜 목록에 유저 추가
      if (!product.wishUserIds.includes(myUid)) {
        const productResult = await Product.updateOne(
          {
            _id: new mongoose.Types.ObjectId(product._id as string),
          },
          {
            $push: { wishUserIds: myUid },
            $inc: { wishCount: 1 },
          },
          { session }
        );

        if (!productResult.acknowledged || productResult.modifiedCount === 0) {
          throw new Error("상품 찜 목록에 유저 아이디 추가에 실패했어요.");
        }
      }

      await session.commitTransaction();
      session.endSession();

      res.status(200).json({ message: "상품을 찜했어요." });
    } catch (error) {
      console.error(error);
      await session.abortTransaction();
      session.endSession();
      res
        .status(500)
        .json({ message: "상품 찜에 실패했어요.\n잠시 후 다시 시도해주세요." });
    }
  }

  if (req.method === "DELETE") {
    try {
      const isValidAuth = await checkAuthorization(req, res);

      if (!isValidAuth?.isValid) {
        res.status(401).json({
          message: isValidAuth?.message,
        });
        return;
      }

      const { productId } = req.query;

      const myUid = isValidAuth?.auth?.uid;
      
      if (!productId) {
        res.status(422).json({ message: "상품 아이디가 없어요." });
        return;
      }

      await dbConnect();

      const product = await Product.findOne({
        _id: new mongoose.Types.ObjectId(productId as string),
      });

      const user = await User.findOne({
        _id: new mongoose.Types.ObjectId(myUid),
      });

      if (!product) {
        res.status(404).json({ message: "상품이 존재하지 않아요." });
        return;
      }

      if (
        !product.wishUserIds.includes(isValidAuth?.auth?.uid) &&
        !user.wishProductIds.includes(product._id)
      ) {
        res.status(409).json({ message: "찜한 상품이 아니에요." });
        return;
      }

      if (user.wishProductIds.includes(product._id)) {
        const profileResult = await User.updateOne(
          {
            _id: new mongoose.Types.ObjectId(myUid),
          },
          { $pull: { wishProductIds: product._id } }
        );
        if (!profileResult.acknowledged || profileResult.modifiedCount === 0) {
          throw new Error("유저 찜 목록에서 상품 아이디 삭제에 실패했어요.");
        }
      }

      if (product.wishUserIds.includes(isValidAuth?.auth?.uid)) {
      const productResult = await Product.updateOne(
          { _id: new mongoose.Types.ObjectId(productId as string) },
          {
            $inc: { wishCount: -1 },
            $pull: { wishUserIds: isValidAuth?.auth?.uid },
          }
        );
        if (!productResult.acknowledged || productResult.modifiedCount === 0) {
          throw new Error("상품 찜 목록에서 유저 아이디 삭제에 실패했어요.");
        }
      }

      res.status(200).json({ message: "상품을 찜 삭제에 성공했어요." });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "상품 찜 삭제에 실패했어요.\n잠시 후 다시 시도해주세요.",
      });
    }
  }
}
