import dbConnect from "@/lib/db";
import Product from "@/lib/db/models/Product";
import PurchaseTrading from "@/lib/db/models/PurchaseTrading";
import SalesTrading from "@/lib/db/models/SalesTrading";
import { checkAuthorization } from "@/lib/server";
import {
  PurchaseCancelProcess,
  PurchaseReturnProcess,
  PurchaseTradingProcess,
  SalesCancelProcess,
  SalesReturnProcess,
  TradingStatus,
} from "@/types/productTypes";
import mongoose from "mongoose";
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

      if (!isValidAuth.isValid) {
        await session.abortTransaction();
        session.endSession();
        res.status(401).json({
          message: isValidAuth.message,
        });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      const myUid = isValidAuth?.auth?.uid;

      await dbConnect();

      const { productId } = req.query;
      const { returnReason } = req.body;

      if (!productId) {
        res.status(422).json({ message: "상품 ID가 존재하지 않아요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (!returnReason || !returnReason.trim()) {
        res.status(422).json({ message: "반품 사유가 존재하지 않아요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      const product = await Product.findOne({
        _id: new mongoose.Types.ObjectId(productId as string),
      });

      if(!product.returnPolicy) {
        res.status(403).json({ message: "반품이 불가한 상품입니다." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

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


      const purchaseTrading = await PurchaseTrading.findOne(
        {
          $and: [
            { process: { $ne: PurchaseCancelProcess.취소완료 } },
            { process: { $ne: PurchaseReturnProcess.반품완료 } },
          ],
          productId,
        },
        null,
        { session }
      );

      if (!purchaseTrading) {
        res.status(404).json({ message: "거래중인 구매 상품 정보가 없어요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }
      
      if (myUid !== purchaseTrading.buyer) {
        res.status(401).json({ message: "잘못된 요청이에요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (purchaseTrading.status === TradingStatus.CANCEL) {
        res.status(409).json({ message: "취소 요청한 상품이에요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (purchaseTrading.status === TradingStatus.RETURN) {
        res.status(409).json({ message: "이미 반품 요청한 상품이에요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (purchaseTrading.status === TradingStatus.CANCEL_END) {
        res.status(409).json({ message: "취소된 상품이에요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (purchaseTrading.status === TradingStatus.RETURN_END) {
        res.status(409).json({ message: "반품된 상품이에요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (
        purchaseTrading.process !== PurchaseTradingProcess.상품인수확인 &&
        purchaseTrading.process !== PurchaseTradingProcess.거래완료
      ) {
        res
          .status(409)
          .json({ message: "상품 반품은 상품을 전달받은 후 가능해요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      const currentDate = new Date();

      const salesTradingUpdateResult = await SalesTrading.updateOne(
        {
          $and: [
            { process: { $ne: SalesCancelProcess.취소완료 } },
            { process: { $ne: SalesReturnProcess.반품완료 } },
          ],
          productId,
        },
        {
          status: TradingStatus.RETURN,
          process: SalesReturnProcess.반품요청확인,
          returnReason,
          returnStartDate: currentDate,
        },
        { session }
      );

      if (
        !salesTradingUpdateResult.acknowledged ||
        salesTradingUpdateResult.modifiedCount === 0
      ) {
        throw new Error("거래 상품 판매 정보 업데이트에 실패했어요.");
      }

      const purchaseTradingUpdateResult = await PurchaseTrading.updateOne(
        {
          $and: [
            { process: { $ne: PurchaseCancelProcess.취소완료 } },
            { process: { $ne: PurchaseReturnProcess.반품완료 } },
          ],
          productId,
        },
        {
          status: TradingStatus.RETURN,
          process: PurchaseReturnProcess.판매자확인중,
          returnReason,
          returnStartDate: currentDate,
        },
        { session }
      );

      if (
        !purchaseTradingUpdateResult.acknowledged ||
        purchaseTradingUpdateResult.modifiedCount === 0
      ) {
        throw new Error("거래 상품 구매 정보 업데이트에 실패했어요.");
      }

      await session.commitTransaction();
      session.endSession();
      res.status(200).json({ message: "반품 요청에 성공했어요." });
    } catch (error) {
      console.error(error);
      await session.abortTransaction();
      session.endSession();
      res.status(500).json({
        message: "반품 요청에 실패했어요.\n잠시 후 다시 시도해주세요.",
      });
    }
  }
}
