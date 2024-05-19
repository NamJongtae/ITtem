import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import dbConnect from "@/lib/db";
import SalesTrading from "@/lib/db/models/SalesTrading";
import {
  PurchaseTradingProcess,
  SalesTradingProcess,
  TradingStatus,
} from "@/types/productTypes";
import { checkAuthorization } from "@/lib/server";
import PurchaseTrading from "@/lib/db/models/PurchaseTrading";

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

      const { productId } = req.query;

      if (!productId) {
        res.status(422).json({ message: "상품 ID가 존재하지 않아요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      await dbConnect();

      const salesTrading = await SalesTrading.findOne(
        {
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

      if (myUid !== salesTrading.seller) {
        res.status(401).json({ message: "잘못된 요청입니다." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      const purchaseTrading = await PurchaseTrading.findOne(
        {
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

      if (salesTrading.status === TradingStatus.CANCEL) {
        res.status(409).json({ message: "구매자가 취소요청한 상품입니다." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (salesTrading.status === TradingStatus.REFUND) {
        res.status(409).json({ message: "구매자가 환불요청한 상품입니다." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (salesTrading.staus === TradingStatus.END) {
        res.status(409).json({ message: "거래가 완료된 상품입니다." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (
        salesTrading.process === SalesTradingProcess.구매자상품인수중 &&
        purchaseTrading.process === PurchaseTradingProcess.상품인수확인
      ) {
        res.status(409).json({ message: "이미 물품전달을 확인한 상품입니다." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (
        salesTrading.process !== SalesTradingProcess.상품전달확인 &&
        purchaseTrading.process !== PurchaseTradingProcess.상품전달중
      ) {
        res.status(409).json({ message: "상품 전달확인 단계가 아닌 상품입니다." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (salesTrading.process === SalesTradingProcess.상품전달확인) {
        const saleTradingUpdateResult = await SalesTrading.updateOne(
          {
            productId,
          },
          { process: SalesTradingProcess.구매자상품인수중 },
          { session }
        );

        if (
          !saleTradingUpdateResult.acknowledged ||
          saleTradingUpdateResult.modifiedCount === 0
        ) {
          throw new Error("거래 상품 판매 status 업데이트에 실패했어요.");
        }
      }

      if (purchaseTrading.process === PurchaseTradingProcess.상품전달중) {
        const purchaseTradingUpdateResult = await PurchaseTrading.updateOne(
          {
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
