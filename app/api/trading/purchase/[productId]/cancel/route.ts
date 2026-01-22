import sendNotificationMessageInFirebase from "@/domains/notification/utils/sendNotificationMessageInFirebase";
import Product from "@/domains/product/shared/models/Product";
import PurchaseTrading from "@/domains/product/shared/models/PurchaseTrading";
import SaleTrading from "@/domains/product/shared/models/SaleTrading";
import checkAuthorization from "@/domains/auth/shared/common/utils/checkAuthorization";
import { ProductStatus } from "@/domains/product/shared/types/productTypes";
import {
  TradingStatus,
  PurchaseCancelProcess,
  PurchaseReturnProcess,
  SalesCancelProcess,
  SalesReturnProcess,
  SaleTradingProcess
} from "@/domains/product/manage/types/productManageTypes";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
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

    const myUid = isValidAuth.auth?.uid;
    const nickname = isValidAuth.auth?.nickname || "";

    const { productId } = await params;
    const { cancelReason } = await req.json();

    if (!cancelReason || !cancelReason.trim()) {
      return NextResponse.json(
        { message: "취소 사유가 입력되지 않았어요." },
        { status: 422 }
      );
    }

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
        { message: "이미 취소 요청한 상품이에요." },
        { status: 409 }
      );
    }

    if (purchaseTrading.status === TradingStatus.RETURN) {
      return NextResponse.json(
        { message: "반품 요청한 상품이에요." },
        { status: 409 }
      );
    }

    if (purchaseTrading.status === TradingStatus.TRADING_END) {
      return NextResponse.json(
        { message: "거래가 완료된 상품이에요." },
        { status: 409 }
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
      return NextResponse.json(
        { message: "거래중인 판매 상품 정보가 없어요." },
        { status: 404 }
      );
    }

    if (saleTrading.process === SaleTradingProcess.구매자상품인수중) {
      return NextResponse.json(
        { message: "판매자가 전달한 상품은 취소할 수 없어요." },
        { status: 409 }
      );
    }

    const currentDate = new Date();

    session = await mongoose.startSession();
    session.startTransaction();

    if (saleTrading.process === SaleTradingProcess.구매요청확인) {
      const productUpdateResult = await Product.updateOne(
        { _id: new mongoose.Types.ObjectId(productId as string) },
        { status: ProductStatus.sold },
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
            { process: { $ne: PurchaseReturnProcess.반품완료 } }
          ],
          productId
        },
        {
          status: TradingStatus.CANCEL_END,
          process: PurchaseCancelProcess.취소완료,
          cancelStartDate: currentDate,
          cancelEndDate: currentDate,
          cancelReason
        },
        { session }
      );

      if (
        !purchaseTradingUpdateResult.acknowledged ||
        purchaseTradingUpdateResult.matchedCount === 0
      ) {
        throw new Error("상품 구매 정보 업데이트에 실패했어요.");
      }

      const saleTradingUpdateResult = await SaleTrading.updateOne(
        {
          $and: [
            { process: { $ne: SalesCancelProcess.취소완료 } },
            { process: { $ne: SalesReturnProcess.반품완료 } }
          ],
          productId
        },
        {
          status: TradingStatus.CANCEL_END,
          process: SalesCancelProcess.취소완료,
          cancelStartDate: currentDate,
          cancelEndDate: currentDate,
          productName: product.name,
          price: product.price,
          cancelReason
        },
        { session }
      );

      if (
        !saleTradingUpdateResult.acknowledged ||
        saleTradingUpdateResult.matchedCount === 0
      ) {
        throw new Error("상품 판매 정보 업데이트에 실패했어요.");
      }

      const newSaleTrading = new SaleTrading({
        productId,
        sellerId: saleTrading.sellerId,
        saleStartDate: saleTrading.saleStartDate,
        productName: saleTrading.productName,
        productPrice: saleTrading.productPrice,
        productImg: saleTrading.productImg
      });

      await newSaleTrading.save({ session });
      await session.commitTransaction();
      session.endSession();

      sendNotificationMessageInFirebase(
        saleTrading.sellerId,
        `${nickname}님이 ${saleTrading.productName} 상품을 구매 취소하였습니다.`
      );

      return NextResponse.json(
        { message: "상품 구매 취소에 성공했어요." },
        { status: 200 }
      );
    } else {
      const purchaseTradingUpdateResult = await PurchaseTrading.updateOne(
        {
          $and: [
            { process: { $ne: PurchaseCancelProcess.취소완료 } },
            { process: { $ne: PurchaseReturnProcess.반품완료 } }
          ],
          productId
        },
        {
          status: TradingStatus.CANCEL,
          process: PurchaseCancelProcess.판매자확인중,
          cancelStartDate: currentDate,
          cancelReason
        },
        { session }
      );

      if (
        !purchaseTradingUpdateResult.acknowledged ||
        purchaseTradingUpdateResult.matchedCount === 0
      ) {
        throw new Error("상품 구매 정보 업데이트에 실패했어요.");
      }

      const saleTradingUpdateResult = await SaleTrading.updateOne(
        {
          $and: [
            { process: { $ne: SalesCancelProcess.취소완료 } },
            { process: { $ne: SalesReturnProcess.반품완료 } }
          ],
          productId
        },
        {
          status: TradingStatus.CANCEL,
          process: SalesCancelProcess.취소요청확인,
          cancelStartDate: currentDate,
          cancelReason
        },
        { session }
      );

      if (
        !saleTradingUpdateResult.acknowledged ||
        saleTradingUpdateResult.matchedCount === 0
      ) {
        throw new Error("상품 판매 정보 업데이트에 실패했어요.");
      }

      await session.commitTransaction();
      session.endSession();

      sendNotificationMessageInFirebase(
        saleTrading.sellerId,
        `${nickname}님이 ${saleTrading.productName} 상품에 구매 취소 요청을 하였습니다.`
      );

      return NextResponse.json(
        { message: "상품 구매 취소요청에 성공했어요." },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);

    if (session) {
      await session.abortTransaction();
      session.endSession();
    }

    return NextResponse.json(
      {
        message: "상품 구매 취소에 실패했어요.\n잠시 후 다시 시도해주세요."
      },
      { status: 500 }
    );
  }
}
