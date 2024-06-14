import { sendNotificationMessage } from "@/lib/api/firebase";
import dbConnect from "@/lib/db";
import PurchaseTrading from "@/lib/db/models/PurchaseTrading";
import SaleTrading from "@/lib/db/models/SaleTrading";
import User from "@/lib/db/models/User";
import { checkAuthorization } from "@/lib/server";
import {
  PurchaseCancelProcess,
  PurchaseReturnProcess,
  PurchaseTradingProcess,
  SalesCancelProcess,
  SalesReturnProcess,
  SaleTradingProcess,
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
        res.status(401).json({
          message: isValidAuth.message,
        });
        await session.abortTransaction();
        session.endSession();
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

      const purchaseTrading = await PurchaseTrading.findOne(
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

      if (!purchaseTrading) {
        res.status(404).json({ message: "거래중인 구매 상품 정보가 없어요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (myUid !== purchaseTrading.buyerId) {
        res.status(401).json({ message: "잘못된 요청입니다." });
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

      if (purchaseTrading.status !== TradingStatus.RETURN) {
        res.status(409).json({ message: "반품 요청한 상품이 아니에요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (purchaseTrading.status === TradingStatus.TRADING_END) {
        res.status(409).json({ message: "거래가 완료된 상품이에요." });
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
        purchaseTrading.process !== PurchaseReturnProcess.판매자확인중 &&
        purchaseTrading.process !== PurchaseReturnProcess.반품상품전달확인
      ) {
        res
          .status(409)
          .json({ message: "반품 철회가 가능한 단계가 아니에요." });
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
        res.status(404).json({ message: "거래중인 판매 상품 정보가 없어요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      const purchaseTradingUpdateResult = await PurchaseTrading.updateOne(
        {
          $and: [
            { process: { $ne: SalesCancelProcess.취소완료 } },
            { process: { $ne: SalesReturnProcess.반품완료 } },
            { process: { $ne: SalesCancelProcess.취소거절 } },
            { process: { $ne: SalesReturnProcess.반품거절 } },
          ],
          productId,
        },
        {
          status: purchaseTrading.purchaseEndDate
            ? TradingStatus.TRADING_END
            : TradingStatus.TRADING,
          process: purchaseTrading.purchaseEndDate
            ? PurchaseTradingProcess.거래완료
            : PurchaseTradingProcess.상품인수확인,
          $unset: { returnStartDate: "", returnReason: "" },
        },
        { session }
      );

      if (
        !purchaseTradingUpdateResult.acknowledged ||
        purchaseTradingUpdateResult.matchedCount === 0
      ) {
        throw new Error("상품 구매 정보 업데이트에 실패했어요.");
      }

      const saleTradingUpdateResult = await SaleTrading.updateOne(
        {
          $and: [
            { process: { $ne: SalesCancelProcess.취소완료 } },
            { process: { $ne: SalesReturnProcess.반품완료 } },
          ],
          productId,
        },
        {
          status: saleTrading.saleEndDate
            ? TradingStatus.TRADING_END
            : TradingStatus.TRADING,
          process: saleTrading.saleEndDate
            ? SaleTradingProcess.거래완료
            : SaleTradingProcess.구매자상품인수중,

          $unset: { returnStartDate: "", returnReason: "" },
        },
        { session }
      );

      if (
        !saleTradingUpdateResult.acknowledged ||
        saleTradingUpdateResult.matchedCount === 0
      ) {
        throw new Error("상품 판매 정보 업데이트에 실패했어요.");
      }

      res.status(200).json({ message: "상품 반품 철회에 성공했어요." });

      sendNotificationMessage(
        saleTrading.sellerId,
        `${user.nickname}님이 ${saleTrading.productName} 상품에 구매 반품을 철회 하였습니다.`
      );

      await session.commitTransaction();
      session.endSession();
    } catch (error) {
      console.error(error);
      await session.abortTransaction();
      session.endSession();
      res.status(500).json({
        message: "상품 반품 철회에 실패했어요.\n잠시 후 다시 시도해주세요.",
      });
    }
  } else {
    res.status(405).json({ message: "잘못된 접근이에요." });
  }
}
