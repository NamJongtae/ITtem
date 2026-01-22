import sendNotificationMessageInFirebase from "@/domains/notification/utils/sendNotificationMessageInFirebase";
import Product from "@/domains/product/shared/models/Product";
import PurchaseTrading from "@/domains/product/shared/models/PurchaseTrading";
import SaleTrading from "@/domains/product/shared/models/SaleTrading";
import User from "@/domains/auth/shared/common/models/User";
import checkAuthorization from "@/domains/auth/shared/common/utils/checkAuthorization";
import {
  PurchaseCancelProcess,
  PurchaseReturnProcess,
  SalesCancelProcess,
  SalesReturnProcess,
  TradingStatus
} from "@/domains/product/manage/types/productManageTypes";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ productId: string | undefined }> }
) => {
  let session: mongoose.ClientSession | null = null;

  try {
    const isValidAuth = await checkAuthorization();

    if (!isValidAuth.isValid) {
      return NextResponse.json(
        { message: isValidAuth.message },
        { status: 401 }
      );
    }

    const myUid = isValidAuth?.auth?.uid;
    const nickname = isValidAuth?.auth?.nickname || "";

    const { productId } = await params;

    if (!productId) {
      return NextResponse.json(
        { message: "상품 ID가 존재하지 않아요." },
        { status: 422 }
      );
    }

    if (productId.length < 24) {
      return NextResponse.json(
        { message: "잘못된 상품 ID에요." },
        { status: 422 }
      );
    }

    const product = await Product.findOne({
      _id: new mongoose.Types.ObjectId(productId as string)
    });

    if (!product) {
      return NextResponse.json(
        { message: "상품이 존재하지 않아요." },
        { status: 404 }
      );
    }

    const saleTrading = await SaleTrading.findOne({
      $and: [
        { process: { $ne: SalesCancelProcess.취소완료 } },
        { process: { $ne: SalesReturnProcess.반품완료 } },
        { process: { $ne: SalesCancelProcess.취소거절 } },
        { process: { $ne: SalesReturnProcess.반품거절 } }
      ],
      productId
    });

    if (!saleTrading) {
      return NextResponse.json(
        { message: "거래중인 판매 상품 정보가 없어요." },
        { status: 404 }
      );
    }

    if (myUid !== saleTrading.sellerId) {
      return NextResponse.json(
        { message: "잘못된 요청이에요." },
        { status: 401 }
      );
    }

    if (saleTrading.status === TradingStatus.CANCEL) {
      return NextResponse.json(
        { message: "취소 요청한 상품이에요." },
        { status: 409 }
      );
    }

    if (saleTrading.status !== TradingStatus.RETURN) {
      return NextResponse.json(
        { message: "구매자가 반품 요청한 상품이 아니에요." },
        { status: 409 }
      );
    }

    if (saleTrading.status === TradingStatus.TRADING_END) {
      return NextResponse.json(
        { message: "거래가 완료된 상품이에요." },
        { status: 409 }
      );
    }

    const purchaseTrading = await PurchaseTrading.findOne({
      $and: [
        { process: { $ne: PurchaseCancelProcess.취소완료 } },
        { process: { $ne: PurchaseReturnProcess.반품완료 } }
      ],
      productId
    });

    if (!purchaseTrading) {
      return NextResponse.json(
        { message: "거래중인 구매 상품 정보가 없어요." },
        { status: 404 }
      );
    }

    if (
      saleTrading.process === SalesReturnProcess.구매자반품상품전달중 &&
      purchaseTrading.process === PurchaseReturnProcess.반품상품전달확인
    ) {
      return NextResponse.json(
        { message: "이미 반품 요청이 확인된 상품이에요." },
        { status: 409 }
      );
    }

    if (
      saleTrading.process !== SalesReturnProcess.반품요청확인 &&
      purchaseTrading.process !== PurchaseReturnProcess.판매자확인중
    ) {
      return NextResponse.json(
        { message: "상품 반품 요청 확인 단계가 아니에요." },
        { status: 409 }
      );
    }

    session = await mongoose.startSession();
    session.startTransaction();

    if (saleTrading.process === SalesReturnProcess.반품요청확인) {
      const saleTradingUpdateResult = await SaleTrading.updateOne(
        {
          $and: [
            { process: { $ne: SalesCancelProcess.취소완료 } },
            { process: { $ne: SalesReturnProcess.반품완료 } }
          ],
          productId
        },
        { process: SalesReturnProcess.구매자반품상품전달중 },
        { session }
      );

      if (
        !saleTradingUpdateResult.acknowledged ||
        saleTradingUpdateResult.modifiedCount === 0
      ) {
        throw new Error("거래 상품 판매 정보 업데이트에 실패했어요.");
      }
    }

    if (purchaseTrading.process === PurchaseReturnProcess.판매자확인중) {
      const purchaseTradingUpdateResult = await PurchaseTrading.updateOne(
        {
          $and: [
            { process: { $ne: PurchaseCancelProcess.취소완료 } },
            { process: { $ne: PurchaseReturnProcess.반품완료 } }
          ],
          productId
        },
        {
          process: PurchaseReturnProcess.반품상품전달확인
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

    sendNotificationMessageInFirebase(
      purchaseTrading.buyerId,
      `${nickname}님이 ${purchaseTrading.productName} 상품에 반품 요청을 확인하였습니다.`
    );

    return NextResponse.json({ message: "상품 반품 요청 확인에 성공했어요." });
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);

    if (session) {
      await session.abortTransaction();
      session.endSession();
    }

    return NextResponse.json(
      {
        message: "반품 요청 확인에 실패했어요.\n잠시 후 다시 시도해주세요."
      },
      { status: 500 }
    );
  }
};
