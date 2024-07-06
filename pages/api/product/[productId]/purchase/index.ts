import dbConnect from "@/lib/db";
import Product from "@/lib/db/models/Product";
import mongoose from "mongoose";
import { checkAuthorization } from "@/lib/server";
import {
  ProductStatus,
  SalesCancelProcess,
  SalesReturnProcess,
  SaleTradingProcess,
} from "@/types/productTypes";
import { NextApiRequest, NextApiResponse } from "next";
import PurchaseTrading from "@/lib/db/models/PurchaseTrading";
import SaleTrading from "@/lib/db/models/SaleTrading";
import { sendNotificationMessage } from "@/lib/api/firebase";
import User from "@/lib/db/models/User";

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

      const user = await User.findOne(
        {
          _id: new mongoose.Types.ObjectId(myUid as string),
        },
        null,
        { session }
      );

      const { productId } = req.query;

      if (!productId) {
        res.status(422).json({ message: "상품 ID가 존재하지 않아요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      await dbConnect();

      const product = await Product.findOne({
        _id: new mongoose.Types.ObjectId(productId as string),
      });

      if (!product) {
        res.status(404).json({ message: "상품이 존재하지 않아요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (product.status === ProductStatus.trading) {
        res.status(409).json({ message: "이미 거래중인 상품이에요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (product.status === ProductStatus.soldout) {
        res.status(409).json({ message: "이미 판매된 상품이에요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      const productUpdateResult = await Product.findOneAndUpdate(
        {
          _id: new mongoose.Types.ObjectId(productId as string),
        },
        {
          status: ProductStatus.trading,
        },
        { session }
      );

      if (!productUpdateResult) {
        res
          .status(500)
          .json({
            message: "상품 구매에 실패했어요.\n잠시 후 다시 시도해주세요.",
          });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      const saleTrading = await SaleTrading.findOne(
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

      if (!saleTrading) {
        res.status(404).json({ message: "판매 상품 거래 정보가 없어요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      const saleTradingUpdateResult = await SaleTrading.updateOne(
        {
          $and: [
            { process: { $ne: SalesCancelProcess.취소완료 } },
            { process: { $ne: SalesReturnProcess.반품완료 } },
          ],
          productId,
        },
        { buyerId: myUid, process: SaleTradingProcess.구매요청확인 },
        { session }
      );

      if (
        !saleTradingUpdateResult.acknowledged ||
        saleTradingUpdateResult.modifiedCount === 0
      ) {
        throw new Error("상품 판매 정보 status 업데이트에 실패했어요.");
      }

      const purchaseTrading = new PurchaseTrading({
        sellerId: saleTrading.sellerId,
        buyerId: myUid,
        productId,
        productName: product.name,
        productPrice: product.price,
        productImg: product.imgData[0].url,
      });

      await purchaseTrading.save({ session });

      await session.commitTransaction();
      session.endSession();

      res.status(201).json({ message: "상품 구매에 성공했어요." });

      sendNotificationMessage(
        saleTrading.sellerId,
        `${user.nickname}님이 ${product.name} 상품에 구매요청을 하였습니다.`
      );
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
