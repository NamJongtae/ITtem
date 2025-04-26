import { sendNotificationMessage } from "@/lib/api/firebase";
import dbConnect from "@/lib/db/db";
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
  TradingStatus
} from "@/types/product-types";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ productId: string | undefined }> }
) => {
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
        { message: "잘못된 요청이에요." },
        { status: 401 }
      );
    }

    if (saleTrading.status === TradingStatus.CANCEL) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { message: "취소 요청한 상품이에요." },
        { status: 409 }
      );
    }

    if (saleTrading.status !== TradingStatus.RETURN) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { message: "반품을 요청한 상품이 아니에요." },
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

    if (saleTrading.status === TradingStatus.CANCEL_END) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { message: "취소된 상품이에요." },
        { status: 409 }
      );
    }

    if (saleTrading.status === TradingStatus.RETURN_END) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { message: "반품된 상품이에요." },
        { status: 409 }
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

    if (
      saleTrading.process === SalesReturnProcess.반품완료 &&
      purchaseTrading.process === PurchaseReturnProcess.반품완료
    ) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { message: "이미 반품 인수가 확인된 상품이에요." },
        { status: 409 }
      );
    }

    if (
      saleTrading.process !== SalesReturnProcess.반품상품인수확인 &&
      purchaseTrading.process !== PurchaseReturnProcess.판매자반품상품인수확인중
    ) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { message: "반품 상품 인수확인 단계가 아니에요" },
        { status: 409 }
      );
    }

    const productUpdateResult = await Product.updateOne(
      {
        _id: new mongoose.Types.ObjectId(productId as string)
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
      productImg: saleTrading.productImg
    });

    await newSaleTrading.save({ session });

    const currentDate = new Date();

    if (saleTrading.process === SalesReturnProcess.반품상품인수확인) {
      const saleTradingUpdateResult = await SaleTrading.updateOne(
        {
          $and: [
            { process: { $ne: SalesCancelProcess.취소완료 } },
            { process: { $ne: SalesReturnProcess.반품완료 } }
          ],
          productId
        },
        {
          status: TradingStatus.RETURN_END,
          process: SalesReturnProcess.반품완료,
          returnEndDate: currentDate
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
      purchaseTrading.process === PurchaseReturnProcess.판매자반품상품인수확인중
    ) {
      const purchaseTradingUpdateResult = await PurchaseTrading.updateOne(
        {
          $and: [
            { process: { $ne: PurchaseCancelProcess.취소완료 } },
            { process: { $ne: PurchaseReturnProcess.반품완료 } }
          ],
          productId
        },
        {
          status: TradingStatus.RETURN_END,
          process: PurchaseReturnProcess.반품완료,
          returnEndDate: currentDate
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
      purchaseTrading.buyerId,
      `${user.nickname}님이 ${purchaseTrading.productName} 반품 상품을 인수 확인하였습니다.`
    );

    return NextResponse.json({ message: "반품 상품 인수 확인에 성공했어요." });
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    session.endSession();
    return NextResponse.json(
      {
        message: "반품 상품 인수 확인에 실패했어요.\n잠시 후 다시 시도해주세요."
      },
      { status: 500 }
    );
  }
};
