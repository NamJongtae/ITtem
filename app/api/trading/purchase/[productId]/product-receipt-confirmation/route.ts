import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/shared/common/utils/db/db";
import SaleTrading from "@/domains/product/shared/models/SaleTrading";
import { ProductStatus } from "@/domains/product/shared/types/productTypes";
import {
  TradingStatus,
  PurchaseCancelProcess,
  PurchaseReturnProcess,
  PurchaseTradingProcess,
  SalesCancelProcess,
  SalesReturnProcess,
  SaleTradingProcess
} from "@/domains/product/manage/types/productManageTypes";
import PurchaseTrading from "@/domains/product/shared/models/PurchaseTrading";
import checkAuthorization from "@/domains/auth/shared/common/utils/checkAuthorization";
import Product from "@/domains/product/shared/models/Product";
import sendNotificationMessageInFirebase from '@/domains/notification/utils/sendNotificationMessageInFirebase';
import User from "@/domains/auth/shared/common/models/User";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string | undefined }> }
) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const isValidAuth = await checkAuthorization();

    if (!isValidAuth.isValid) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { message: isValidAuth.message },
        { status: 401 }
      );
    }

    const myUid = isValidAuth?.auth?.uid;

    const user = await User.findOne(
      { _id: new mongoose.Types.ObjectId(myUid) },
      null,
      { session }
    );

    const { productId } = await params;

    if (!productId) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { message: "상품 ID가 존재하지 않아요." },
        { status: 422 }
      );
    }

    if (productId.length < 24) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { message: "잘못된 상품 ID에요." },
        { status: 422 }
      );
    }

    await dbConnect();

    const product = await Product.findOne(
      { _id: new mongoose.Types.ObjectId(productId) },
      null,
      { session }
    );

    if (!product) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { message: "상품이 존재하지 않아요." },
        { status: 404 }
      );
    }

    const purchaseTrading = await PurchaseTrading.findOne(
      {
        $and: [
          { process: { $ne: SalesCancelProcess.취소완료 } },
          { process: { $ne: SalesReturnProcess.반품완료 } },
          { process: { $ne: SalesCancelProcess.취소거절 } },
          { process: { $ne: SalesReturnProcess.반품거절 } }
        ],
        productId
      },
      null,
      { session }
    );

    if (!purchaseTrading) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { message: "거래중인 구매 상품 정보가 없어요." },
        { status: 404 }
      );
    }

    if (myUid !== purchaseTrading.buyerId) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { message: "잘못된 요청입니다." },
        { status: 401 }
      );
    }

    const saleTrading = await SaleTrading.findOne(
      {
        $and: [
          { process: { $ne: SalesCancelProcess.취소완료 } },
          { process: { $ne: SalesReturnProcess.반품완료 } }
        ],
        productId
      },
      null,
      { session }
    );

    if (!saleTrading) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { message: "거래중인 판매 상품 정보가 없어요." },
        { status: 404 }
      );
    }

    if (purchaseTrading.status === TradingStatus.CANCEL) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { message: "취소 요청한 상품이에요." },
        { status: 409 }
      );
    }

    if (purchaseTrading.status === TradingStatus.RETURN) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { message: "반품 요청한 상품이에요." },
        { status: 409 }
      );
    }

    if (purchaseTrading.status === TradingStatus.TRADING_END) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { message: "거래가 완료된 상품이에요." },
        { status: 409 }
      );
    }

    if (
      saleTrading.process === SaleTradingProcess.거래완료 &&
      purchaseTrading.process === PurchaseTradingProcess.거래완료
    ) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { message: "이미 상품 인수를 확인한 상품이에요." },
        { status: 409 }
      );
    }

    if (
      saleTrading.process !== SaleTradingProcess.구매자상품인수중 &&
      purchaseTrading.process !== PurchaseTradingProcess.상품인수확인
    ) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { message: "상품 인수단계가 아닌 상품이에요." },
        { status: 409 }
      );
    }

    const currentDate = new Date();

    if (purchaseTrading.process === PurchaseTradingProcess.상품인수확인) {
      const purchaseOrderUpdateResult = await PurchaseTrading.updateOne(
        {
          $and: [
            { process: { $ne: PurchaseCancelProcess.취소완료 } },
            { process: { $ne: PurchaseReturnProcess.반품완료 } }
          ],
          productId
        },
        {
          process: SaleTradingProcess.거래완료,
          status: TradingStatus.TRADING_END,
          purchaseEndDate: currentDate
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

    if (saleTrading.process === SaleTradingProcess.구매자상품인수중) {
      const saleTradingUpdateResult = await SaleTrading.updateOne(
        {
          $and: [
            { process: { $ne: SalesCancelProcess.취소완료 } },
            { process: { $ne: SalesReturnProcess.반품완료 } }
          ],
          productId
        },
        {
          process: SaleTradingProcess.거래완료,
          status: TradingStatus.TRADING_END,
          saleEndDate: currentDate
        },
        { session }
      );

      if (
        !saleTradingUpdateResult.acknowledged ||
        saleTradingUpdateResult.modifiedCount === 0
      ) {
        throw new Error("거래 상품 판매 status 업데이트에 실패했어요.");
      }
    }

    const productUpdateResult = await Product.updateOne(
      { _id: new mongoose.Types.ObjectId(productId) },
      {
        status: ProductStatus.soldout
      },
      { session }
    );

    if (
      !productUpdateResult.acknowledged ||
      productUpdateResult.modifiedCount === 0
    ) {
      throw new Error("상품 status 업데이트에 실패했어요.");
    }

    await User.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(saleTrading.sellerId) },
      { $inc: { saleCount: 1 } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    sendNotificationMessageInFirebase(
      saleTrading.sellerId,
      `${user.nickname}님이 ${saleTrading.productName} 상품 구매 취소를 철회하였습니다.`
    );

    sendNotificationMessageInFirebase(
      saleTrading.sellerId,
      `${saleTrading.productName} 상품에 대한 거래가 완료되었습니다.`
    );

    return NextResponse.json(
      { message: "상품 인수를 확인했어요." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    session.endSession();
    return NextResponse.json(
      {
        message: "상품 인수 확인에 실패했어요.\n잠시 후 다시 시도해주세요."
      },
      { status: 500 }
    );
  }
}
