import dbConnect from "@/lib/db";
import Product from "@/lib/db/models/Product";
import SalesTrading from '@/lib/db/models/SalesTrading';
import User from "@/lib/db/models/User";
import { checkAuthorization } from "@/lib/server";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const isValidAuth = await checkAuthorization(req, res);

      if (!isValidAuth.isValid) {
        await session.abortTransaction();
        session.endSession();
        res.status(401).json({
          message: isValidAuth.message,
        });
        return;
      }

      const { productData } = req.body;

      const myUid = isValidAuth?.auth?.uid;

      await dbConnect();

      const newProduct = new Product(productData);

      await newProduct.save({ session });

      const updateResult = await User.updateOne(
        { _id: new mongoose.Types.ObjectId(myUid) },
        { $push: { productIds: newProduct._id } },
        { session }
      );

      if (!updateResult.acknowledged || updateResult.modifiedCount === 0) {
        throw new Error("유저에 상품 아이디 등록에 실패했어요.");
      }

      const salesTrading= new SalesTrading({
        seller: newProduct.uid,
        productId: newProduct._id,
      });

      await salesTrading.save({ session });

      await session.commitTransaction();
      session.endSession();

      res.status(201).json({
        message: "상품 등록에 성공했어요.",
        product: newProduct,
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error(error);
      if (error instanceof mongoose.Error.ValidationError) {
        const errorMessages = Object.values(error.errors).map(
          (err) => err.message
        );
        res.status(422).json({
          message: "유효하지 않은 값이 있어요.",
          error: errorMessages,
        });
        return;
      }
      res.status(500).json({
        message: "상품 등록에 실패하였어요.\n잠시 후 다시 시도해주세요.",
      });
    }
  }
}
