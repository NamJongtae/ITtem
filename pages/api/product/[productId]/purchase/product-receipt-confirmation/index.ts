import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import dbConnect from "@/lib/db";
import SalesTrading from "@/lib/db/models/SalesTrading";
import {
  ProductStatus,
  PurchaseCancelProcess,
  PurchaseReturnProcess,
  PurchaseTradingProcess,
  SalesCancelProcess,
  SalesReturnProcess,
  SalesTradingProcess,
  TradingStatus,
} from "@/types/productTypes";
import PurchaseTrading from "@/lib/db/models/PurchaseTrading";
import { checkAuthorization } from "@/lib/server";
import Product from "@/lib/db/models/Product";

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

      const product = await Product.findOne(
        {
          _id: new mongoose.Types.ObjectId(productId as string),
        },
        null,
        { session }
      );

      if (!product) {
        res.status(404).json({ message: "상품이 존재하지 않아요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      const purchaseTrading = await PurchaseTrading.findOne(
        {
          $and: [
            { status: { $ne: PurchaseCancelProcess.취소완료 } },
            { status: { $ne: PurchaseReturnProcess.반품완료 } },
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

      const salesTrading = await SalesTrading.findOne(
        {
          $and: [
            { status: { $ne: SalesCancelProcess.취소완료 } },
            { status: { $ne: SalesReturnProcess.반품완료 } },
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

      if (purchaseTrading.status === TradingStatus.END) {
        res.status(409).json({ message: "거래가 완료된 상품이에요." });
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
        res.status(409).json({ message: "반품 요청한 상품이에요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (
        salesTrading.process === SalesTradingProcess.거래완료 &&
        purchaseTrading.process === PurchaseTradingProcess.거래완료
      ) {
        res.status(409).json({ message: "이미 상품인수을 확인한 상품입니다." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (
        salesTrading.process !== SalesTradingProcess.구매자상품인수중 &&
        purchaseTrading.process !== PurchaseTradingProcess.상품인수확인
      ) {
        res.status(409).json({ message: "상품 인수단계가 아닌 상품입니다." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      const currentDate = new Date();

      if (purchaseTrading.process === PurchaseTradingProcess.상품인수확인) {
        const purchaseOrderUpdateResult = await PurchaseTrading.updateOne(
          {
            $and: [
              { status: { $ne: PurchaseCancelProcess.취소완료 } },
              { status: { $ne: PurchaseReturnProcess.반품완료 } },
            ],
            productId,
          },
          {
            process: SalesTradingProcess.거래완료,
            status: TradingStatus.END,
            purchaseEndDate: currentDate,
          },
          { session }
        );

        if (
          !purchaseOrderUpdateResult.acknowledged ||
          purchaseOrderUpdateResult.modifiedCount === 0
        ) {
          throw new Error("거래 상품 구매 status 업데이트에 실패했어요.");
        }
      }

      if (salesTrading.process === SalesTradingProcess.구매자상품인수중) {
        const salesTradingrUpdateResult = await SalesTrading.updateOne(
          {
            $and: [
              { status: { $ne: SalesCancelProcess.취소완료 } },
              { status: { $ne: SalesReturnProcess.반품완료 } },
            ],
            productId,
          },
          {
            process: SalesTradingProcess.거래완료,
            status: TradingStatus.END,
            saleEndDate: currentDate,
          },
          { session }
        );

        if (
          !salesTradingrUpdateResult.acknowledged ||
          salesTradingrUpdateResult.modifiedCount === 0
        ) {
          throw new Error("거래 상품 판매 status 업데이트에 실패했어요.");
        }
      }

      const productUpdateResult = await Product.updateOne(
        { _id: new mongoose.Types.ObjectId(productId as string) },
        {
          status: ProductStatus.soldout,
        },
        { session }
      );

      if (
        !productUpdateResult.acknowledged ||
        productUpdateResult.modifiedCount === 0
      ) {
        throw new Error("상품 status 업데이트에 실패했어요.");
      }

      await session.commitTransaction();
      session.endSession();

      res.status(200).json({
        message: "물품인수를 확인했어요.",
      });
    } catch (error) {
      console.error(error);
      await session.abortTransaction();
      session.endSession();
      res.status(500).json({
        message: "물품인수 확인에 실패했어요.\n잠시 후 다시 시도해주세요.",
      });
    }
  }
}
