import dbConnect from "@/lib/db";
import Product from "@/lib/db/models/Product";
import PurchaseTrading from "@/lib/db/models/PurchaseTrading";
import SalesTrading from "@/lib/db/models/SalesTrading";
import { checkAuthorization } from "@/lib/server";
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
      const { rejectReason } = req.body;

      if (!productId) {
        res.status(422).json({ message: "상품 ID가 존재하지 않아요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (!rejectReason || !rejectReason.trim()) {
        res
          .status(422)
          .json({ message: "상품 반품 거절 사유가 존재하지 않아요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      const salesTrading = await SalesTrading.findOne(
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

      if (!salesTrading) {
        res.status(404).json({ message: "거래중인 판매 상품 정보가 없어요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (myUid !== salesTrading.sellerId) {
        res.status(401).json({ message: "잘못된 요청이에요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (salesTrading.status === TradingStatus.CANCEL) {
        res.status(409).json({ message: "취소 요청한 상품이에요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (salesTrading.status !== TradingStatus.RETURN) {
        res.status(409).json({ message: "반품을 요청한 상품이 아니에요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (salesTrading.status === TradingStatus.TRADING_END) {
        res.status(409).json({ message: "거래가 완료된 상품이에요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (salesTrading.status === TradingStatus.CANCEL_END) {
        res.status(409).json({ message: "취소된 상품이에요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (salesTrading.status === TradingStatus.RETURN_END) {
        res.status(409).json({ message: "반품된 상품이에요." });
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

      if (
        salesTrading.process === SalesReturnProcess.구매자반품상품전달중 &&
        purchaseTrading.process === PurchaseReturnProcess.반품상품전달확인
      ) {
        res.status(409).json({
          message:
            "반품 요청을 확인한 상품은 반품 상품 확인 후 반품 거절이 가능해요.",
        });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      const productUpdateResult = await Product.updateOne(
        {
          _id: new mongoose.Types.ObjectId(productId as string),
        },
        { status: ProductStatus.sold },
        { session }
      );

      if (
        !productUpdateResult.acknowledged ||
        productUpdateResult.matchedCount === 0
      ) {
        throw new Error("상품 status 업데이트에 실패했어요.");
      }

      const salesTradingUpdateResult = await SalesTrading.updateOne(
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
          status:
            salesTrading.process === SalesReturnProcess.반품요청확인
              ? TradingStatus.TRADING_END
              : TradingStatus.TRADING,
          process:
            salesTrading.process === SalesReturnProcess.반품요청확인
              ? SalesTradingProcess.거래완료
              : SalesTradingProcess.상품전달확인,
          $unset: { returnStartDate: "", returnReason: "" },
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
            { process: { $ne: SalesCancelProcess.취소거절 } },
            { process: { $ne: SalesReturnProcess.반품거절 } },
          ],
          productId,
        },
        {
          status:
            purchaseTrading.process === PurchaseReturnProcess.판매자확인중
              ? TradingStatus.TRADING_END
              : TradingStatus.TRADING,
          process:
            purchaseTrading.process === PurchaseReturnProcess.판매자확인중
              ? PurchaseTradingProcess.거래완료
              : PurchaseTradingProcess.판매자상품전달중,
          $unset: { returnStartDate: "", returnReason: "" },
        },
        { session }
      );

      if (
        !purchaseTradingUpdateResult.acknowledged ||
        purchaseTradingUpdateResult.modifiedCount === 0
      ) {
        throw new Error("거래 상품 구매 정보 업데이트에 실패했어요.");
      }

      const currentDate = new Date();
      const returnRejectSaleTrading = new SalesTrading({
        sellerId: salesTrading.sellerId,
        buyerId: salesTrading.buyerId,
        productId,
        productName: salesTrading.productName,
        saleStartDate: salesTrading.saleStartDate,
        returnStartDate: salesTrading.returnStartDate,
        returnRejectDate: currentDate,
        returnRejectReason: rejectReason,
        status: TradingStatus.RETURN_REJECT,
        process: SalesReturnProcess.반품거절,
      });

      const returnRejectPurchaseTrading = new PurchaseTrading({
        sellerId: salesTrading.sellerId,
        buyerId: salesTrading.buyerId,
        productId,
        productName: salesTrading.productName,
        purchaseStartDate: purchaseTrading.purchaseStartDate,
        returnStartDate: purchaseTrading.returnStartDate,
        returnRejectDate: currentDate,
        returnRejectReason: rejectReason,
        status: TradingStatus.RETURN_REJECT,
        process: PurchaseReturnProcess.반품거절,
      });

      await returnRejectSaleTrading.save({ session });
      await returnRejectPurchaseTrading.save({ session });

      await session.commitTransaction();
      session.endSession();
      res.status(200).json({ message: "반품 요청 거절에 성공했어요." });
    } catch (error) {
      console.error(error);
      await session.abortTransaction();
      session.endSession();
      res.status(500).json({
        message: "반품 요청 거절에 실패했어요.\n잠시 후 다시 시도해주세요.",
      });
    }
  }
}
