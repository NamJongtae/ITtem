import dbConnect from "@/lib/db";
import Product from "@/lib/db/models/Product";
import PurchaseTrading from "@/lib/db/models/PurchaseTrading";
import SalesTrading from "@/lib/db/models/SalesTrading";
import { checkAuthorization } from "@/lib/server";
import {
  ProductStatus,
  PurchaseCancelProcess,
  PurchaseRefundProcess,
  SalesCancelProcess,
  SalesRefundProcess,
  SalesTradingProcess,
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

      const { productId } = req.query;
      const { cancelReason } = req.body;

      if (!cancelReason || !cancelReason.trim()) {
        res.status(422).json({ message: "취소 사유가 입력되지 않았어요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

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
            { process: { $ne: PurchaseCancelProcess.취소완료 } },
            { process: { $ne: PurchaseRefundProcess.환불완료 } },
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
        res.status(401).json({ message: "잘못된 요청입니다." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (purchaseTrading.status === TradingStatus.END) {
        res.status(409).json({ message: "거래가 완료된 상품이에요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (
        purchaseTrading.status === TradingStatus.CANCEL &&
        purchaseTrading.process === PurchaseCancelProcess.취소완료
      ) {
        res.status(409).json({ message: "이미 취소 완료된 상품이에요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (purchaseTrading.status === TradingStatus.CANCEL) {
        res.status(409).json({ message: "이미 취소 요청한 상품이에요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (purchaseTrading.status === TradingStatus.REFUND) {
        res.status(409).json({ message: "환불 요청한 상품이에요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      const salesTrading = await SalesTrading.findOne(
        {
          $and: [
            { process: { $ne: SalesCancelProcess.취소완료 } },
            { process: { $ne: SalesRefundProcess.환불완료 } },
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

      if (salesTrading.process === SalesTradingProcess.구매자상품인수중) {
        res.status(409).json({ message: "판매자가 전달한 상품은 취소할 수 없어요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      const currentDate = new Date();

      if (salesTrading.process === SalesTradingProcess.구매요청확인) {
        const productUpdateResult = await Product.updateOne(
          {
            _id: new mongoose.Types.ObjectId(productId as string),
          },
          {
            status: ProductStatus.sold,
          },
          { session }
        );

        if (
          !productUpdateResult.acknowledged ||
          productUpdateResult.modifiedCount === 0
        ) {
          throw new Error("상품 status 업데이트에 실패했어요.");
        }

        const purchaseTradingUpdateResult = await PurchaseTrading.updateOne(
          {
            $and: [
              { process: { $ne: PurchaseCancelProcess.취소완료 } },
              { process: { $ne: PurchaseRefundProcess.환불완료 } },
            ],
            productId,
          },
          {
            status: TradingStatus.CANCEL,
            process: PurchaseCancelProcess.취소완료,
            cancelStartDate: currentDate,
            cancelEndDate: currentDate,
            cancelReason,
          },
          { session }
        );

        if (
          !purchaseTradingUpdateResult.acknowledged ||
          purchaseTradingUpdateResult.matchedCount === 0
        ) {
          throw new Error("상품 구매 정보 업데이트에 실패했어요.");
        }

        const salesTradingUpdateResult = await SalesTrading.updateOne(
          {
            $and: [
              { process: { $ne: SalesCancelProcess.취소완료 } },
              { process: { $ne: SalesRefundProcess.환불완료 } },
            ],
            productId,
          },
          {
            status: TradingStatus.CANCEL,
            process: SalesCancelProcess.취소완료,
            cancelStartDate: currentDate,
            cancelEndDate: currentDate,
            cancelReason,
          },
          { session }
        );

        if (
          !salesTradingUpdateResult.acknowledged ||
          salesTradingUpdateResult.matchedCount === 0
        ) {
          throw new Error("상품 판매 정보 업데이트에 실패했어요.");
        }

        const newSalesTrading = new SalesTrading({
          productId,
          seller: myUid,
        });

        await newSalesTrading.save({ session });
      } else {
        const purchaseTradingUpdateResult = await PurchaseTrading.updateOne(
          {
            $and: [
              { process: { $ne: PurchaseCancelProcess.취소완료 } },
              { process: { $ne: PurchaseRefundProcess.환불완료 } },
            ],
            productId,
          },
          {
            status: TradingStatus.CANCEL,
            process: PurchaseCancelProcess.취소요청,
            cancelStartDate: currentDate,
            cancelReason,
          },
          { session }
        );

        if (
          !purchaseTradingUpdateResult.acknowledged ||
          purchaseTradingUpdateResult.matchedCount === 0
        ) {
          throw new Error("상품 구매 정보 업데이트에 실패했어요.");
        }

        const salesTradingUpdateResult = await SalesTrading.updateOne(
          {
            $and: [
              { process: { $ne: SalesCancelProcess.취소완료 } },
              { process: { $ne: SalesRefundProcess.환불완료 } },
            ],
            productId,
          },
          {
            status: TradingStatus.CANCEL,
            process: SalesCancelProcess.취소요청확인,
            cancelStartDate: currentDate,
            cancelReason,
          },
          { session }
        );

        if (
          !salesTradingUpdateResult.acknowledged ||
          salesTradingUpdateResult.matchedCount === 0
        ) {
          throw new Error("상품 판매 정보 업데이트에 실패했어요.");
        }
      }

      await session.commitTransaction();
      session.endSession();
      res.status(200).json({ message: "상품 구매 취소에 성공했어요." });
    } catch (error) {
      console.error(error);
      await session.abortTransaction();
      session.endSession();
      res.status(500).json({
        message: "상품 구매 취소에 실패했어요.\n잠시 후 다시 시도해주세요.",
      });
    }
  }
}