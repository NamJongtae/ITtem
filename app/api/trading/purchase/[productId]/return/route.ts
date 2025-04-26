import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/db/db";
import Product from "@/lib/db/models/Product";
import PurchaseTrading from "@/lib/db/models/PurchaseTrading";
import SaleTrading from "@/lib/db/models/SaleTrading";
import User from "@/lib/db/models/User";
import { checkAuthorization } from "@/lib/server";
import { sendNotificationMessage } from "@/lib/api/firebase";
import {
  PurchaseReturnProcess,
  PurchaseTradingProcess,
  SalesCancelProcess,
  SalesReturnProcess,
  TradingStatus
} from "@/types/product-types";

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
    const { returnReason } = await req.json();

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

    if (!returnReason || !returnReason.trim()) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { message: "반품 사유가 존재하지 않아요." },
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

    if (product.returnPolicy === "불가능") {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { message: "반품이 불가한 상품이에요." },
        { status: 403 }
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

    if (myUid !== purchaseTrading.buyerId) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { message: "잘못된 요청이에요." },
        { status: 401 }
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
        { message: "이미 반품 요청한 상품이에요." },
        { status: 409 }
      );
    }

    if (
      purchaseTrading.process !== PurchaseTradingProcess.상품인수확인 &&
      purchaseTrading.process !== PurchaseTradingProcess.거래완료
    ) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { message: "상품 반품은 상품을 전달받은 후 가능해요." },
        { status: 409 }
      );
    }

    const currentDate = new Date();

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

    sendNotificationMessage(
      saleTrading.sellerId,
      `${user.nickname}님이 ${product.name} 상품에 반품 요청을 하였습니다.`
    );

    return NextResponse.json(
      { message: "상품 반품 요청에 성공했어요." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    session.endSession();
    return NextResponse.json(
      {
        message: "상품 반품 요청에 실패했어요.\n잠시 후 다시 시도해주세요."
      },
      { status: 500 }
    );
  }
}
