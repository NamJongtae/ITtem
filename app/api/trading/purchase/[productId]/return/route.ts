import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Product from "@/domains/product/shared/models/Product";
import PurchaseTrading from "@/domains/product/shared/models/PurchaseTrading";
import SaleTrading from "@/domains/product/shared/models/SaleTrading";
import User from "@/domains/auth/shared/common/models/User";
import checkAuthorization from "@/domains/auth/shared/common/utils/checkAuthorization";
import sendNotificationMessageInFirebase from "@/domains/notification/utils/sendNotificationMessageInFirebase";
import {
  TradingStatus,
  PurchaseReturnProcess,
  PurchaseTradingProcess,
  SalesCancelProcess,
  SalesReturnProcess
} from "@/domains/product/manage/types/productManageTypes";
import * as Sentry from "@sentry/nextjs";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string | undefined }> }
) {
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
    const { returnReason } = await req.json();

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

    if (!returnReason || !returnReason.trim()) {
      return NextResponse.json(
        { message: "반품 사유가 존재하지 않아요." },
        { status: 422 }
      );
    }

    const product = await Product.findOne({
      _id: new mongoose.Types.ObjectId(productId)
    });

    if (!product) {
      return NextResponse.json(
        { message: "상품이 존재하지 않아요." },
        { status: 404 }
      );
    }

    if (product.returnPolicy === "불가능") {
      return NextResponse.json(
        { message: "반품이 불가한 상품이에요." },
        { status: 403 }
      );
    }

    const saleTrading = await SaleTrading.findOne({
      $and: [
        { process: { $ne: SalesCancelProcess.취소완료 } },
        { process: { $ne: SalesReturnProcess.반품완료 } }
      ],
      productId
    });

    if (!saleTrading) {
      return NextResponse.json(
        { message: "거래중인 판매 상품 정보가 없어요." },
        { status: 404 }
      );
    }

    const purchaseTrading = await PurchaseTrading.findOne({
      $and: [
        { process: { $ne: SalesCancelProcess.취소완료 } },
        { process: { $ne: SalesReturnProcess.반품완료 } },
        { process: { $ne: SalesCancelProcess.취소거절 } },
        { process: { $ne: SalesReturnProcess.반품거절 } }
      ],
      productId
    });

    if (!purchaseTrading) {
      return NextResponse.json(
        { message: "거래중인 구매 상품 정보가 없어요." },
        { status: 404 }
      );
    }

    if (myUid !== purchaseTrading.buyerId) {
      return NextResponse.json(
        { message: "잘못된 요청이에요." },
        { status: 401 }
      );
    }

    if (purchaseTrading.status === TradingStatus.CANCEL) {
      return NextResponse.json(
        { message: "취소 요청한 상품이에요." },
        { status: 409 }
      );
    }

    if (purchaseTrading.status === TradingStatus.RETURN) {
      return NextResponse.json(
        { message: "이미 반품 요청한 상품이에요." },
        { status: 409 }
      );
    }

    if (
      purchaseTrading.process !== PurchaseTradingProcess.상품인수확인 &&
      purchaseTrading.process !== PurchaseTradingProcess.거래완료
    ) {
      return NextResponse.json(
        { message: "상품 반품은 상품을 전달받은 후 가능해요." },
        { status: 409 }
      );
    }

    const currentDate = new Date();

    session = await mongoose.startSession();
    session.startTransaction();

    const saleTradingUpdateResult = await SaleTrading.updateOne(
      {
        $and: [
          { process: { $ne: SalesCancelProcess.취소완료 } },
          { process: { $ne: SalesReturnProcess.반품완료 } }
        ],
        productId
      },
      {
        status: TradingStatus.RETURN,
        process: SalesReturnProcess.반품요청확인,
        returnReason,
        returnStartDate: currentDate
      },
      { session }
    );

    if (
      !saleTradingUpdateResult.acknowledged ||
      saleTradingUpdateResult.modifiedCount === 0
    ) {
      throw new Error("거래 상품 판매 정보 업데이트에 실패했어요.");
    }

    const purchaseTradingUpdateResult = await PurchaseTrading.updateOne(
      {
        $and: [
          { process: { $ne: SalesCancelProcess.취소완료 } },
          { process: { $ne: SalesReturnProcess.반품완료 } },
          { process: { $ne: SalesCancelProcess.취소거절 } },
          { process: { $ne: SalesReturnProcess.반품거절 } }
        ],
        productId
      },
      {
        status: TradingStatus.RETURN,
        process: PurchaseReturnProcess.판매자확인중,
        returnReason,
        returnStartDate: currentDate
      },
      { session }
    );

    if (
      !purchaseTradingUpdateResult.acknowledged ||
      purchaseTradingUpdateResult.modifiedCount === 0
    ) {
      throw new Error("거래 상품 구매 정보 업데이트에 실패했어요.");
    }

    await session.commitTransaction();
    session.endSession();

    sendNotificationMessageInFirebase(
      saleTrading.sellerId,
      `${nickname}님이 ${product.name} 상품에 반품 요청을 하였습니다.`
    );

    return NextResponse.json(
      { message: "상품 반품 요청에 성공했어요." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);

    if (session) {
      await session.abortTransaction();
      session.endSession();
    }

    return NextResponse.json(
      {
        message: "상품 반품 요청에 실패했어요.\n잠시 후 다시 시도해주세요."
      },
      { status: 500 }
    );
  }
}
