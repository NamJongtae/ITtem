import Review from "@/lib/db/models/Review";
import { checkAuthorization } from "@/lib/server";
import { NextApiRequest, NextApiResponse } from "next";
import PurchaseTrading from "@/lib/db/models/PurchaseTrading";
import { TradingStatus } from "@/types/productTypes";
import SaleTrading from "@/lib/db/models/SaleTrading";
import ReviewScore from "@/lib/db/models/ReviewScore";
import mongoose from "mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { productId } = req.query;
      const isValidAuth = await checkAuthorization(req, res);

      if (!isValidAuth.isValid) {
        res.status(401).json({
          message: isValidAuth.message,
        });
        return;
      }

      if (!productId) {
        res.status(422).json({ message: "상품 ID가 없어요." });
        return;
      }

      const purchaseTrading = await PurchaseTrading.findOne({
        productId,
        status: TradingStatus.TRADING_END,
      });

      if (!purchaseTrading) {
        res.status(404).json({ message: "구매 거래 정보가 없어요." });
        return;
      }

      const saleTrading = await SaleTrading.findOne({
        productId,
        status: TradingStatus.TRADING_END,
      });

      if (!saleTrading) {
        res.status(404).json({ message: "판매 거래 정보가 없어요." });
        return;
      }

      const review = await Review.aggregate([
        {
          $match: {
            productId,
            purchaseTradingId: purchaseTrading._id.toString(),
          },
        },
        {
          $addFields: {
            buyerObjectId: { $toObjectId: "$buyerId" },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "buyerObjectId",
            foreignField: "_id",
            as: "reviewer",
          },
        },
        {
          $unwind: "$reviewer",
        },
        {
          $project: {
            reviewScore: 1,
            reviewTags: 1,
            reviewContent: 1,
            "reviewer.nickname": 1,
            "reviewer.profileImg": 1,
          },
        },
      ]);

      if (!review.length) {
        res.status(404).json({ message: "리뷰가 없어요." });
        return;
      }

      res
        .status(200)
        .json({ message: "리뷰 조회에 성공했어요.", review: review[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "리뷰 조회에 실패했어요.\n잠시 후 다시 시도해주세요.",
      });
    }
  }
  if (req.method === "POST") {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const { productId } = req.query;
      const { reviewContent, reviewTags, reviewScore } = req.body;

      const isValidAuth = await checkAuthorization(req, res);

      if (!isValidAuth.isValid) {
        res.status(401).json({
          message: isValidAuth.message,
        });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      const myUid = isValidAuth?.auth?.uid;

      if (
        (!reviewContent || !reviewContent.trim()) &&
        !reviewTags.includes(1)
      ) {
        res.status(422).json({ message: "리뷰 내용이 없어요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (!productId) {
        res.status(422).json({ message: "상품 ID가 없어요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      const purchseTrading = await PurchaseTrading.findOneAndUpdate(
        {
          productId,
          status: TradingStatus.TRADING_END,
        },
        { isReviewed: true },
        { session }
      );

      if (!purchseTrading) {
        res.status(404).json({ message: "구매 거래 정보가 없어요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      if (myUid !== purchseTrading.buyerId) {
        res.status(401).json({ message: "잘못된 요청이에요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      const saleTrading = await SaleTrading.findOneAndUpdate(
        {
          productId,
          status: TradingStatus.TRADING_END,
        },
        { isReviewed: true },
        { session, returnDocument: "after" }
      );

      if (!saleTrading) {
        res.status(404).json({ message: "판매 거래 정보가 없어요." });
        await session.abortTransaction();
        session.endSession();
        return;
      }

      const review = new Review({
        sellerId: saleTrading.sellerId,
        buyerId: myUid,
        saleTradingId: saleTrading._id,
        purchaseTradingId: purchseTrading._id,
        productId,
        productName: purchseTrading.productName,
        reviewScore,
        reviewContent,
        reviewTags,
      });

      await review.save({ session });

      const sellerReviewScore = await ReviewScore.findOne(
        {
          uid: saleTrading.sellerId,
        },
        null,
        { session }
      );

      if (!sellerReviewScore) {
        const newReviewScore = new ReviewScore({
          uid: saleTrading.sellerId,
          totalReviewCount: 1,
          totalReviewScore: reviewScore,
          reviewTags,
        });

        await newReviewScore.save({ session });
      } else {
        const updateTags = (prevTags: any) => {
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
            uid: saleTrading.sellerId,
          },
          {
            $inc: {
              totalReviewCount: 1,
              totalReviewScore: reviewScore,
            },
            reviewTags: newTags,
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

      res.status(201).json({ message: "리뷰 등록에 성공했어요." });
      await session.commitTransaction();
      session.endSession();
    } catch (error) {
      console.error(error);
      await session.abortTransaction();
      session.endSession();
      if (error instanceof mongoose.Error.ValidationError) {
        const errorMessages = Object.values(error.errors).map(
          (err) => err.message
        );
        res.status(422).json({
          message: "유효하지 않은 값이 있어요.",
          error: errorMessages,
        });
        return;
      }
      res
        .status(500)
        .json("리뷰 등록에 실패했어요.\n잠시 후 다시 시도해주세요.");
    }
  }
}
