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

      if (!productId) {
        res.status(422).json({ message: "상품 ID가 존재하지 않아요." });
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

      if (myUid !== salesTrading.seller) {
        res.status(401).json({ message: "잘못된 요청이에요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (
        salesTrading.status === TradingStatus.CANCEL &&
        salesTrading.process === SalesCancelProcess.취소완료
      ) {
        res.status(409).json({ message: "이미 취소가 완료된 상품이에요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (salesTrading.status === TradingStatus.REFUND) {
        res.status(409).json({ message: "환불 요청한 상품이에요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (salesTrading.staus === TradingStatus.END) {
        res.status(409).json({ message: "거래가 완료된 상품이에요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

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

      if (
        salesTrading.process !== SalesCancelProcess.취소요청확인 &&
        purchaseTrading.process !== PurchaseCancelProcess.취소요청
      ) {
        res
          .status(409)
          .json({ message: "상품 취소확인 단계가 아닌 상품입니다." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

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

      const currentDate = new Date();

      const salesTradingUpdateResult = await SalesTrading.updateOne(
        {
          $and: [
            { process: { $ne: SalesCancelProcess.취소완료 } },
            { process: { $ne: SalesRefundProcess.환불완료 } },
          ],
          productId,
        },
        { process: SalesCancelProcess.취소완료, cancelEndDate: currentDate },
        { session }
      );

      if (
        !salesTradingUpdateResult.acknowledged ||
        salesTradingUpdateResult.modifiedCount === 0
      ) {
        throw new Error("상품 판매 정보 업데이트에 실패했어요.");
      }

      const purchaseTradingUpdateResult = await PurchaseTrading.updateOne(
        {
          $and: [
            { process: { $ne: PurchaseCancelProcess.취소완료 } },
            { process: { $ne: PurchaseRefundProcess.환불완료 } },
          ],
          productId,
        },
        { process: PurchaseCancelProcess.취소완료, cancelEndDate: currentDate },
        { session }
      );

      if (
        !purchaseTradingUpdateResult.acknowledged ||
        purchaseTradingUpdateResult.modifiedCount === 0
      ) {
        throw new Error("거래 상품 구매 status 업데이트에 실패했어요.");
      }
      const newSalesTrading = new SalesTrading({
        productId,
        seller: myUid,
      });

      await newSalesTrading.save();

      await session.commitTransaction();
      session.endSession();
      res.status(200).json({
        message: "취소요청 확인에 성공했어요. 거래가 취소 되었어요.",
      });
    } catch (error) {
      console.error(error);
      await session.abortTransaction();
      session.endSession();
      res.status(500).json({
        message: "취소 요청 확인에 실패했어요.\n잠시 후 다시 시도해주세요.",
      });
    }
  }
}