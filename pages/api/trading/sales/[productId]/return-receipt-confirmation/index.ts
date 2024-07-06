import { sendNotificationMessage } from "@/lib/api/firebase";
import dbConnect from "@/lib/db";
import Product from "@/lib/db/models/Product";
import PurchaseTrading from "@/lib/db/models/PurchaseTrading";
import SaleTrading from "@/lib/db/models/SaleTrading";
import User from "@/lib/db/models/User";
import { checkAuthorization } from "@/lib/server";
import {
  ProductStatus,
  PurchaseCancelProcess,
  PurchaseReturnProcess,
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

      const user = await User.findOne(
        {
          _id: new mongoose.Types.ObjectId(myUid as string),
        },
        null,
        { session }
      );

      await dbConnect();

      const { productId } = req.query;

      if (!productId) {
        res.status(422).json({ message: "상품 ID가 존재하지 않아요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

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
        res.status(401).json({ message: "잘못된 요청이에요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (saleTrading.status === TradingStatus.CANCEL) {
        res.status(409).json({ message: "취소 요청한 상품이에요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (saleTrading.status !== TradingStatus.RETURN) {
        res.status(409).json({ message: "반품을 요청한 상품이 아니에요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (saleTrading.status === TradingStatus.TRADING_END) {
        res.status(409).json({ message: "거래가 완료된 상품이에요." });
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
        saleTrading.process === SalesReturnProcess.반품완료 &&
        purchaseTrading.process === PurchaseReturnProcess.반품완료
      ) {
        res
          .status(409)
          .json({ message: "이미 반품 인수가 확인된 상품이에요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (
        saleTrading.process !== SalesReturnProcess.반품상품인수확인 &&
        purchaseTrading.process !==
          PurchaseReturnProcess.판매자반품상품인수확인중
      ) {
        res.status(409).json({ message: "반품 상품 인수확인 단계가 아니에요" });
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

      const newSaleTrading = new SaleTrading({
        productId,
        sellerId: saleTrading.sellerId,
        saleStartDate: saleTrading.saleStartDate,
        productName: saleTrading.productName,
        productPrice: saleTrading.productPrice,
        productImg: saleTrading.productImg,
      });

      console.log(productId);

      await newSaleTrading.save({ session });

      const currentDate = new Date();

      if (saleTrading.process === SalesReturnProcess.반품상품인수확인) {
        const saleTradingUpdateResult = await SaleTrading.updateOne(
          {
            $and: [
              { process: { $ne: SalesCancelProcess.취소완료 } },
              { process: { $ne: SalesReturnProcess.반품완료 } },
            ],
            productId,
          },
          {
            status: TradingStatus.RETURN_END,
            process: SalesReturnProcess.반품완료,
            returnEndDate: currentDate,
          },
          { session }
        );

        if (
          !saleTradingUpdateResult.acknowledged ||
          saleTradingUpdateResult.modifiedCount === 0
        ) {
          throw new Error("거래 상품 판매 정보 업데이트에 실패했어요.");
        }
      }

      if (
        purchaseTrading.process ===
        PurchaseReturnProcess.판매자반품상품인수확인중
      ) {
        const purchaseTradingUpdateResult = await PurchaseTrading.updateOne(
          {
            $and: [
              { process: { $ne: PurchaseCancelProcess.취소완료 } },
              { process: { $ne: PurchaseReturnProcess.반품완료 } },
            ],
            productId,
          },
          {
            status: TradingStatus.RETURN_END,
            process: PurchaseReturnProcess.반품완료,
            returnEndDate: currentDate,
          },
          { session }
        );

        if (
          !purchaseTradingUpdateResult.acknowledged ||
          purchaseTradingUpdateResult.modifiedCount === 0
        ) {
          throw new Error("거래 상품 구매 정보 업데이트에 실패했어요.");
        }
      }

      await session.commitTransaction();
      session.endSession();

      res.status(200).json({ message: "반품 상품 인수 확인에 성공했어요." });

      sendNotificationMessage(
        purchaseTrading.buyerId,
        `${user.nickname}님이 ${purchaseTrading.productName} 반품 상품을 인수 확인하였습니다.`
      );
    } catch (error) {
      console.error(error);
      await session.abortTransaction();
      session.endSession();
      res.status(500).json({
        message:
          "반품 상품 인수 확인에 실패했어요.\n잠시 후 다시 시도해주세요.",
      });
    }
  }
}