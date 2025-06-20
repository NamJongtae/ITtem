import Review from "@/domains/user/shared/models/Review";
import checkAuthorization from "@/domains/auth/shared/common/utils/checkAuthorization";
import PurchaseTrading from "@/domains/product/shared/models/PurchaseTrading";
import { TradingStatus } from "@/domains/product/manage/types/productManageTypes";
import SaleTrading from "@/domains/product/shared/models/SaleTrading";
import ReviewScore from "@/domains/user/shared/models/ReviewScore";
import mongoose from "mongoose";
import dbConnect from "@/shared/common/utils/db/db";
import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

export async function GET(
  req: NextRequest,
  {
    params
  }: {
    params: Promise<{ productId: string | undefined }>;
  }
) {
  try {
    const { productId } = await params;
    const isValidAuth = await checkAuthorization();

    if (!isValidAuth.isValid) {
      return NextResponse.json(
        {
          message: isValidAuth.message
        },
        { status: 401 }
      );
    }

    if (!productId) {
      return NextResponse.json(
        { message: "상품 아이디가 없어요." },
        { status: 422 }
      );
    }

    if (productId.length < 24) {
      return NextResponse.json(
        { message: "잘못된 상품 ID에요." },
        { status: 422 }
      );
    }

    await dbConnect();

    const purchaseTrading = await PurchaseTrading.findOne({
      productId,
      status: TradingStatus.TRADING_END
    });

    if (!purchaseTrading) {
      throw new Error("구매 거래 정보가 없어요.");
    }

    const saleTrading = await SaleTrading.findOne({
      productId,
      status: TradingStatus.TRADING_END
    });

    if (!saleTrading) {
      throw new Error("판매 거래 정보가 없어요.");
    }

    const review = await Review.aggregate([
      {
        $match: {
          productId,
          purchaseTradingId: purchaseTrading._id.toString()
        }
      },
      {
        $addFields: {
          buyerObjectId: { $toObjectId: "$buyerId" }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "buyerObjectId",
          foreignField: "_id",
          as: "reviewer"
        }
      },
      {
        $unwind: "$reviewer"
      },
      {
        $project: {
          reviewScore: 1,
          reviewTags: 1,
          reviewContent: 1,
          "reviewer.nickname": 1,
          "reviewer.profileImg": 1
        }
      }
    ]);

    return NextResponse.json(
      { message: "상품 리뷰 조회에 성공했어요.", review: review[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
    return NextResponse.json(
      {
        message: "상품 리뷰 조회에 실패했어요.\n잠시 후 다시 시도해주세요."
      },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string | undefined }> }
) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { productId } = await params;
    const body = await req.json();
    const { reviewContent, reviewTags, reviewScore } = body;

    const isValidAuth = await checkAuthorization();

    if (!isValidAuth.isValid) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        {
          message: isValidAuth.message
        },
        { status: 401 }
      );
    }

    const myUid = isValidAuth?.auth?.uid;

    if (!productId) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { message: "상품 아이디가 없어요." },
        { status: 422 }
      );
    }

    if (productId.length < 24) {
      return NextResponse.json(
        { message: "잘못된 상품 ID에요." },
        { status: 422 }
      );
    }

    await dbConnect();

    const purchaseTrading = await PurchaseTrading.findOneAndUpdate(
      {
        productId,
        status: TradingStatus.TRADING_END
      },
      { isReviewed: true },
      { session }
    );

    if (!purchaseTrading) {
      throw new Error("구매 거래 정보가 없어요.");
    }

    if (myUid !== purchaseTrading.buyerId) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { message: "잘못된 요청이에요." },
        { status: 401 }
      );
    }

    const saleTrading = await SaleTrading.findOneAndUpdate(
      {
        productId,
        status: TradingStatus.TRADING_END
      },
      { isReviewed: true },
      { session, returnDocument: "after" }
    );

    if (!saleTrading) {
      throw new Error("판매 거래 정보가 없어요.");
    }

    const review = new Review({
      sellerId: saleTrading.sellerId,
      buyerId: myUid,
      saleTradingId: saleTrading._id,
      purchaseTradingId: purchaseTrading._id,
      productId,
      productName: purchaseTrading.productName,
      reviewScore,
      reviewContent,
      reviewTags
    });

    await review.save({ session });

    const sellerReviewScore = await ReviewScore.findOne(
      {
        uid: saleTrading.sellerId
      },
      null,
      { session }
    );

    if (!sellerReviewScore) {
      const newReviewScore = new ReviewScore({
        uid: saleTrading.sellerId,
        totalReviewCount: 1,
        totalReviewScore: reviewScore,
        reviewTags
      });

      await newReviewScore.save({ session });
    } else {
      const updateTags = (prevTags: number[]) => {
        reviewTags.forEach((tag: number, index: number) => {
          if (tag === 1) {
            prevTags[index] = prevTags[index] + 1;
          }
        });
        return prevTags;
      };

      const newTags = updateTags(sellerReviewScore.reviewTags);

      const reviewScoreUpdateResult = await ReviewScore.updateOne(
        {
          uid: saleTrading.sellerId
        },
        {
          $inc: {
            totalReviewCount: 1,
            totalReviewScore: reviewScore
          },
          reviewTags: newTags
        },
        { session }
      );

      if (
        !reviewScoreUpdateResult.acknowledged ||
        reviewScoreUpdateResult.modifiedCount === 0
      ) {
        throw new Error("유저 리뷰 점수 업데이트 실패했어요.");
      }
    }

    await session.commitTransaction();
    session.endSession();
    return NextResponse.json(
      { message: "상품 리뷰 작성에 성공했어요." },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
    await session.abortTransaction();
    session.endSession();
    if (error instanceof mongoose.Error.ValidationError) {
      const errorMessages = Object.values(error.errors).map(
        (err) => err.message
      );
      return NextResponse.json(
        {
          message: "유효하지 않은 값이 있어요.",
          error: errorMessages
        },
        { status: 422 }
      );
    }
    return NextResponse.json(
      {
        message: "상품 리뷰 작성에 실패했어요.\n잠시 후 다시 시도해주세요."
      },
      { status: 500 }
    );
  }
}
