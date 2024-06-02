import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import dbConnect from "@/lib/db";
import SaleTrading from "@/lib/db/models/SaleTrading";
import {
  PurchaseCancelProcess,
  PurchaseReturnProcess,
  PurchaseTradingProcess,
  SalesCancelProcess,
  SalesReturnProcess,
  SaleTradingProcess,
  TradingStatus,
} from "@/types/productTypes";
import { checkAuthorization } from "@/lib/server";
import PurchaseTrading from "@/lib/db/models/PurchaseTrading";
import User from "@/lib/db/models/User";
import { sendNotificationMessage } from '@/lib/api/firebase';

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

      const saleTrading = await SaleTrading.findOne(
        {
          $and: [
            { process: { $ne: SalesCancelProcess.취소완료 } },
            { process: { $ne: SalesReturnProcess.반품완료 } },
            { process: { $ne: SalesCancelProcess.취소거절 } },
            { process: { $ne: SalesReturnProcess.반품거절 } },
          ],
          productId,
        },
        null,
        { session }
      );

      if (!saleTrading) {
        res.status(404).json({ message: "거래중인 판매 상품 정보가 없어요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (myUid !== saleTrading.sellerId) {
        res.status(401).json({ message: "잘못된 요청입니다." });
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

      if (saleTrading.status === TradingStatus.CANCEL) {
        res.status(409).json({ message: "구매자가 취소요청한 상품입니다." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (saleTrading.status === TradingStatus.RETURN) {
        res.status(409).json({ message: "구매자가 반품요청한 상품입니다." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (saleTrading.status === TradingStatus.TRADING_END) {
        res.status(409).json({ message: "거래가 완료된 상품입니다." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (saleTrading.status === TradingStatus.CANCEL_END) {
        res.status(409).json({ message: "취소된 상품이에요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (saleTrading.status === TradingStatus.RETURN_END) {
        res.status(409).json({ message: "반품된 상품이에요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (
        saleTrading.process === SaleTradingProcess.구매자상품인수중 &&
        purchaseTrading.process === PurchaseTradingProcess.상품인수확인
      ) {
        res.status(409).json({ message: "이미 물품전달을 확인한 상품입니다." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (
        saleTrading.process !== SaleTradingProcess.상품전달확인 &&
        purchaseTrading.process !== PurchaseTradingProcess.판매자상품전달중
      ) {
        res
          .status(409)
          .json({ message: "상품 전달확인 단계가 아닌 상품입니다." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (saleTrading.process === SaleTradingProcess.상품전달확인) {
        const saleTradingUpdateResult = await SaleTrading.updateOne(
          {
            $and: [
              { process: { $ne: SalesCancelProcess.취소완료 } },
              { process: { $ne: SalesReturnProcess.반품완료 } },
            ],
            productId,
          },
          { process: SaleTradingProcess.구매자상품인수중 },
          { session }
        );

        if (
          !saleTradingUpdateResult.acknowledged ||
          saleTradingUpdateResult.modifiedCount === 0
        ) {
          throw new Error("거래 상품 판매 status 업데이트에 실패했어요.");
        }
      }

      if (purchaseTrading.process === PurchaseTradingProcess.판매자상품전달중) {
        const purchaseTradingUpdateResult = await PurchaseTrading.updateOne(
          {
            $and: [
              { process: { $ne: PurchaseCancelProcess.취소완료 } },
              { process: { $ne: PurchaseReturnProcess.반품완료 } },
            ],
            productId,
          },
          { process: PurchaseTradingProcess.상품인수확인 },
          { session }
        );

        if (
          !purchaseTradingUpdateResult.acknowledged ||
          purchaseTradingUpdateResult.modifiedCount === 0
        ) {
          throw new Error("거래 상품 구매 status 업데이트에 실패했어요.");
        }
      }

      await session.commitTransaction();
      session.endSession();

      res.status(200).json({
        message: "물품전달 확인에 성공했어요.",
      });

      sendNotificationMessage(
        purchaseTrading.buyerId,
        `${user.nickname}님이 ${purchaseTrading.productName} 상품을 전달하였습니다.`
      );
    } catch (error) {
      console.error(error);
      await session.abortTransaction();
      session.endSession();
      res.status(500).json({
        message: "물품전달 확인에 실패했어요.\n잠시 후 다시 시도해주세요.",
      });
    }
  }
}
