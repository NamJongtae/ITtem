import dbConnect from "@/lib/db";
import Product from "@/lib/db/models/Product";
import mongoose from "mongoose";
import { checkAuthorization } from "@/lib/server";
import {
  ProductStatus,
  SalesCancelProcess,
  SalesReturnProcess,
  SalesTradingProcess,
} from "@/types/productTypes";
import { NextApiRequest, NextApiResponse } from "next";
import PurchaseTrading from "@/lib/db/models/PurchaseTrading";
import SalesTrading from "@/lib/db/models/SalesTrading";

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

      const myUid = isValidAuth?.auth?.uid;

      const { productId } = req.query;

      if (!productId) {
        res.status(422).json({ message: "상품 ID가 존재하지 않아요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      await dbConnect();

      const existingPurcahseProduct = await Product.findOne({
        _id: new mongoose.Types.ObjectId(productId as string),
        status: ProductStatus.trading,
      });

      if (existingPurcahseProduct) {
        res.status(409).json({ message: "이미 거래중인 상품이에요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      const product = await Product.findOneAndUpdate(
        {
          _id: new mongoose.Types.ObjectId(productId as string),
        },
        {
          status: ProductStatus.trading,
        },
        { session }
      );

      if (!product) {
        res.status(404).json({ message: "상품이 존재하지 않아요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      const purchaseTrading = new PurchaseTrading({
        buyer: myUid,
        productId,
      });

      await purchaseTrading.save({ session });

      const salesTrading = await SalesTrading.findOne(
        {
          $and: [
            { process: { $ne: SalesCancelProcess.취소완료 } },
            { process: { $ne: SalesReturnProcess.반품완료 } },
          ],
          productId,
        },
        null,
        { session }
      );

      if (!salesTrading) {
        res.status(404).json({ message: "거래중인 판매 상품 정보가 없어요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      const salesTradingUpdateResult = await SalesTrading.updateOne(
        {
          $and: [
            { process: { $ne: SalesCancelProcess.취소완료 } },
            { process: { $ne: SalesReturnProcess.반품완료 } },
          ],
          productId,
        },
        { process: SalesTradingProcess.구매요청확인 },
        { session }
      );

      if (
        !salesTradingUpdateResult.acknowledged ||
        salesTradingUpdateResult.modifiedCount === 0
      ) {
        throw new Error("상품 판매 정보 status 업데이트에 실패했어요.");
      }

      await session.commitTransaction();
      session.endSession();

      res
        .status(201)
        .json({ message: "상품 구매요청에 성공했어요.", PurchaseTrading });
    } catch (error) {
      console.error(error);
      await session.abortTransaction();
      session.endSession();
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
        message: "상품 구매에 실패했어요.\n잠시 후 다시 시도해주세요.",
      });
    }
  }

}
