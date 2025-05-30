import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/shared/common/utils/db/db";
import SaleTrading from "@/domains/product/shared/models/SaleTrading";
import {
  PurchaseCancelProcess,
  PurchaseReturnProcess,
  PurchaseTradingProcess,
  SalesCancelProcess,
  SalesReturnProcess,
  SaleTradingProcess,
  TradingStatus
} from "@/domains/product/manage/types/productManageTypes";
import PurchaseTrading from "@/domains/product/shared/models/PurchaseTrading";
import checkAuthorization from "@/domains/auth/shared/common/utils/checkAuthorization";
import User from "@/domains/auth/shared/common/models/User";
import sendNotificationMessageInFirebase from "@/domains/notification/utils/sendNotificationMessageInFirebase";
import Product from "@/domains/product/shared/models/Product";

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
      {
        _id: new mongoose.Types.ObjectId(myUid as string)
      },
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

    const product = await Product.findOne({
      _id: new mongoose.Types.ObjectId(productId as string)
    });

    if (!product) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { message: "상품이 존재하지 않아요." },
        { status: 404 }
      );
    }

    const saleTrading = await SaleTrading.findOne(
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

    if (!saleTrading) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { message: "거래중인 판매 상품 정보가 없어요." },
        { status: 404 }
      );
    }

    if (myUid !== saleTrading.sellerId) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { message: "잘못된 요청입니다." },
        { status: 401 }
      );
    }

    const purchaseTrading = await PurchaseTrading.findOne(
      {
        $and: [
          { process: { $ne: PurchaseCancelProcess.취소완료 } },
          { process: { $ne: PurchaseReturnProcess.반품완료 } }
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

    if (saleTrading.status === TradingStatus.CANCEL) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { message: "구매자가 취소요청한 상품이에요." },
        { status: 409 }
      );
    }

    if (saleTrading.status === TradingStatus.RETURN) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { message: "구매자가 반품요청한 상품이에요." },
        { status: 409 }
      );
    }

    if (saleTrading.status === TradingStatus.TRADING_END) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { message: "거래가 완료된 상품이에요." },
        { status: 409 }
      );
    }

    if (
      saleTrading.process === SaleTradingProcess.상품전달확인 &&
      purchaseTrading.process === PurchaseTradingProcess.판매자상품전달중
    ) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { message: "이미 상품 구매 요청을 확인한 상품입니다." },
        { status: 409 }
      );
    }

    if (
      saleTrading.process !== SaleTradingProcess.구매요청확인 &&
      purchaseTrading.process !== PurchaseTradingProcess.판매자확인중
    ) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { message: "상품 구매요청확인 단계가 아닌 상품입니다." },
        { status: 409 }
      );
    }

    if (saleTrading.process === SaleTradingProcess.구매요청확인) {
      const saleTradingUpdateResult = await SaleTrading.updateOne(
        {
          $and: [
            { process: { $ne: SalesCancelProcess.취소완료 } },
            { process: { $ne: SalesReturnProcess.반품완료 } }
          ],
          productId
        },
        { process: SaleTradingProcess.상품전달확인 },
        { session }
      );

      if (
        !saleTradingUpdateResult.acknowledged ||
        saleTradingUpdateResult.modifiedCount === 0
      ) {
        throw new Error("거래 상품 판매 status 업데이트에 실패했어요.");
      }
    }

    if (purchaseTrading.process === PurchaseTradingProcess.판매자확인중) {
      const purchaseTradingUpdateResult = await PurchaseTrading.updateOne(
        {
          $and: [
            { process: { $ne: PurchaseCancelProcess.취소완료 } },
            { process: { $ne: PurchaseReturnProcess.반품완료 } }
          ],
          productId
        },
        { process: PurchaseTradingProcess.판매자상품전달중 },
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

    sendNotificationMessageInFirebase(
      purchaseTrading.buyerId,
      `${user.nickname}님이 ${purchaseTrading.productName} 상품 구매 요청을 확인하였습니다.`
    );

    return NextResponse.json({
      message: "구매요청 확인에 성공했어요."
    });
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    session.endSession();
    return NextResponse.json(
      {
        message: "구매요청 확인에 실패했어요.\n잠시 후 다시 시도해주세요."
      },
      { status: 500 }
    );
  }
}
