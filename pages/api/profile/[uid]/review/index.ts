import dbConnect from "@/lib/db";
import mongoose from "mongoose";
import Review from "@/lib/db/models/Review";
import User from "@/lib/db/models/User";
import { checkAuthorization } from "@/lib/server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const isValidAuth = await checkAuthorization(req, res);

      if (!isValidAuth.isValid) {
        res.status(401).json({
          message: isValidAuth.message,
        });
        return;
      }

      const { uid, limit, cursor } = req.query;

      if (!uid) {
        res.status(422).json({ message: "유저 아이디가 없어요." });
        return;
      }

      if (uid.length < 24) {
        res.status(404).json({ message: "유저가 존재하지 않아요." });
        return;
      }

      await dbConnect();

      const todayStart = new Date();
      const cursorDate = cursor ? new Date(cursor as string) : todayStart;
      const pageLimit = parseInt(limit as string, 10) || 10;

      const reviewsWithBuyerInfo = await Review.aggregate([
        {
          $match: {
            seller: uid as string,
            createdAt: { $lt: cursorDate },
          },
        },
        {
          $limit: pageLimit,
        },
        {
          $sort: { createdAt: -1, _id: -1 },
        },
        {
          $addFields: {
            convertedBuyerId: { $toObjectId: "$buyer" },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "convertedBuyerId",
            foreignField: "_id",
            as: "reviewer",
          },
        },
        {
          $unwind: {
            path: "$reviewer",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            tags: 1,
            seller: 1,
            _id: 1,
            reviewScore: 1,
            productName: 1,
            productId: 1,
            content: 1,
            createdAt: 1,
            "reviewer.nickname": 1,
            "reviewer.profileImg": 1,
            "reviewer.uid": "$reviewer._id",
          },
        },
      ]);

      if (!reviewsWithBuyerInfo.length) {
        res.status(404).json({ message: "리뷰 목록이 없어요." });
        return;
      }

      res.status(200).json({
        message: "리뷰 목록 조회에 성공했어요.",
        reviews: reviewsWithBuyerInfo,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "리뷰 목록 조회에 실패했어요\n잠시 후 다시 시도해주세요.",
      });
    }
  }
}
