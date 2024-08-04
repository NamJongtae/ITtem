import mongoose from "mongoose";
import { checkAuthorization } from "@/lib/server";
import dbConnect from "@/lib/db/db";
import SaleTrading from "@/lib/db/models/SaleTrading";
import {
  PurchaseCancelProcess,
  PurchaseReturnProcess,
  PurchaseTradingProcess,
  SalesCancelProcess,
  SalesReturnProcess,
  SaleTradingProcess,
  TradingStatus,
} from "@/types/product-types";
import PurchaseTrading from "@/lib/db/models/PurchaseTrading";
import User from "@/lib/db/models/User";
import { sendNotificationMessage } from "@/lib/api/firebase";
import Product from "@/lib/db/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { productId: string | undefined } }
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
        _id: new mongoose.Types.ObjectId(myUid as string),
      },
      null,
      { session }
    );

    await dbConnect();

    const { productId } = params;
    const { rejectReason } = await req.json();

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
      _id: new mongoose.Types.ObjectId(productId as string),
    });

    if (!product) {
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
          { process: { $ne: SalesReturnProcess.반품거절 } },
        ],
        productId,
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

    if (myUid !== saleTrading.sellerId) {
      return NextResponse.json(
        { message: "잘못된 요청이에요." },
        { status: 401 }
      );
    }

    if (saleTrading.status !== TradingStatus.CANCEL) {
      return NextResponse.json(
        { message: "구매자가 취소 요청한 상품이 아니에요." },
        { status: 409 }
      );
    }

    if (saleTrading.status === TradingStatus.RETURN) {
      return NextResponse.json(
        { message: "구매자가 반품 요청한 상품이에요." },
        { status: 409 }
      );
    }

    if (saleTrading.status === TradingStatus.TRADING_END) {
      return NextResponse.json(
        { message: "거래가 완료된 상품이에요." },
        { status: 409 }
      );
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
      return NextResponse.json(
        { message: "거래중인 구매 상품 정보가 없어요." },
        { status: 404 }
      );
    }

    if (
      saleTrading.process !== SalesCancelProcess.취소요청확인 &&
      purchaseTrading.process !== PurchaseCancelProcess.판매자확인중
    ) {
      return NextResponse.json(
        { message: "상품 취소 거절 단계가 아닌 상품입니다." },
        { status: 409 }
      );
    }

    const currentDate = new Date();
    const cancelRejectSaleTrading = new SaleTrading({
      sellerId: saleTrading.sellerId,
      buyerId: saleTrading.buyerId,
      productId,
      productName: saleTrading.productName,
      productPrice: saleTrading.productPrice,
      productImg: saleTrading.productImg,
      saleStartDate: saleTrading.saleStartDate,
      cancelStartDate: saleTrading.cancelStartDate,
      cancelEndDate: currentDate,
      cancelRejectReason: rejectReason,
      status: TradingStatus.CANCEL_REJECT,
      process: SalesCancelProcess.취소거절,
    });

    const cancelRejectPurchaseTrading = new PurchaseTrading({
      sellerId: saleTrading.sellerId,
      buyerId: saleTrading.buyerId,
      productId,
      productName: saleTrading.productName,
      productPrice: saleTrading.productPrice,
      productImg: saleTrading.productImg,
      purchaseStartDate: saleTrading.purchaseStartDate,
      cancelStartDate: saleTrading.cancelStartDate,
      cancelRejectDate: currentDate,
      cancelRejectReason: rejectReason,
      status: TradingStatus.CANCEL_REJECT,
      process: PurchaseCancelProcess.취소거절,
    });

    await cancelRejectSaleTrading.save({ session });
    await cancelRejectPurchaseTrading.save({ session });

    const saleTradingUpdateResult = await SaleTrading.updateOne(
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
        status: TradingStatus.TRADING,
        process: SaleTradingProcess.상품전달확인,
        $unset: { cancelStartDate: "", cancelReason: "" },
      },
      { session }
    );

    if (
      !saleTradingUpdateResult.acknowledged ||
      saleTradingUpdateResult.modifiedCount === 0
    ) {
      throw new Error("상품 판매 정보 업데이트에 실패했어요.");
    }

    const purchaseTradingUpdateResult = await PurchaseTrading.updateOne(
      {
        $and: [
          { process: { $ne: PurchaseCancelProcess.취소완료 } },
          { process: { $ne: PurchaseReturnProcess.반품완료 } },
        ],
        productId,
      },
      {
        status: TradingStatus.TRADING,
        process: PurchaseTradingProcess.판매자상품전달중,
        $unset: { cancelStartDate: "", cancelReason: "" },
      },
      { session }
    );

    if (
      !purchaseTradingUpdateResult.acknowledged ||
      purchaseTradingUpdateResult.modifiedCount === 0
    ) {
      throw new Error("거래 상품 구매 status 업데이트에 실패했어요.");
    }

    await session.commitTransaction();
    session.endSession();

    await sendNotificationMessage(
      purchaseTrading.buyerId,
      `${user.nickname}님이 ${purchaseTrading.productName} 상품에 구매 취소를 거절하였습니다.`
    );

    return NextResponse.json({
      message: "취소요청 거부에 성공했어요.",
    });
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    session.endSession();
    return NextResponse.json(
      {
        message: "취소 요청 거부에 실패했어요.\n잠시 후 다시 시도해주세요.",
      },
      { status: 500 }
    );
  }
}
