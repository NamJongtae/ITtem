import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/shared/common/utils/db/db";
import Product from "@/domains/product/shared/models/Product";
import PurchaseTrading from "@/domains/product/shared/models/PurchaseTrading";
import SaleTrading from "@/domains/product/shared/models/SaleTrading";
import User from "@/domains/auth/shared/common/models/User";
import checkAuthorization from "@/domains/auth/shared/common/utils/checkAuthorization";
import { sendNotificationMessage } from "@/shared/common/utils/api/firebase";
import {
  TradingStatus,
  PurchaseCancelProcess,
  PurchaseReturnProcess,
  SalesCancelProcess,
  SalesReturnProcess
} from "@/domains/product/manage/types/productManageTypes";

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

    await dbConnect();

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

    const product = await Product.findOne({
      _id: new mongoose.Types.ObjectId(productId)
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

    if (purchaseTrading.status === TradingStatus.CANCEL) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { message: "취소 요청한 상품이에요." },
        { status: 409 }
      );
    }

    if (purchaseTrading.status !== TradingStatus.RETURN) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { message: "반품 요청한 상품이 아니에요." },
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

    if (myUid !== purchaseTrading.buyerId) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { message: "잘못된 요청이에요." },
        { status: 401 }
      );
    }

    if (
      saleTrading.process === SalesReturnProcess.반품상품인수확인 &&
      purchaseTrading.process === PurchaseReturnProcess.판매자반품상품인수확인중
    ) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { message: "이미 반품 상품전달을 확인한 상품이에요." },
        { status: 409 }
      );
    }

    if (
      saleTrading.process !== SalesReturnProcess.구매자반품상품전달중 &&
      purchaseTrading.process !== PurchaseReturnProcess.반품상품전달확인
    ) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { message: "반품 상품 전달 확인 단계가 아니에요." },
        { status: 409 }
      );
    }

    if (saleTrading.process === SalesReturnProcess.구매자반품상품전달중) {
      const saleTradingUpdateResult = await SaleTrading.updateOne(
        {
          $and: [
            { process: { $ne: SalesCancelProcess.취소완료 } },
            { process: { $ne: SalesReturnProcess.반품완료 } }
          ],
          productId
        },
        {
          process: SalesReturnProcess.반품상품인수확인
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

    if (purchaseTrading.process === PurchaseReturnProcess.반품상품전달확인) {
      const purchaseTradingUpdateResult = await PurchaseTrading.updateOne(
        {
          $and: [
            { process: { $ne: PurchaseCancelProcess.취소완료 } },
            { process: { $ne: PurchaseReturnProcess.반품완료 } }
          ],
          productId
        },
        {
          process: PurchaseReturnProcess.판매자반품상품인수확인중
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

    sendNotificationMessage(
      saleTrading.sellerId,
      `${user.nickname}님이 ${saleTrading.productName} 반품 상품을 전달 하였습니다.`
    );

    return NextResponse.json(
      { message: "반품 상품 전달 확인에 성공했어요." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    session.endSession();
    return NextResponse.json(
      {
        message: "반품 상품 전달 확인에 실패했어요.\n잠시 후 다시 시도해주세요."
      },
      { status: 500 }
    );
  }
}
