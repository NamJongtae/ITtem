import dbConnect from "@/lib/db";
import User from "@/lib/db/models/User";
import { checkAuthorization } from "@/lib/server";
import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      await dbConnect();

      const isValidAuth = await checkAuthorization(req, res);
      
      if (!isValidAuth.isValid) {
        res.status(401).json({
          message: isValidAuth.message,
        });
        return;
      }

      const myUid = isValidAuth?.auth?.uid;

      const aggregation = [
        {
          $match: { _id: new mongoose.Types.ObjectId(myUid as string) },
        },
        {
          $lookup: {
            from: "reviewScore",
            localField: "uid",
            foreignField: "uid",
            as: "reviewInfo",
          },
        },
        {
          $unwind: {
            path: "$reviewInfo",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $addFields: {
            reviewPercentage: {
              $cond: {
                if: {
                  $eq: [{ $ifNull: ["$reviewInfo.totalScore", null] }, null],
                },
                then: 0,
                else: {
                  $round: [
                    {
                      $multiply: [
                        {
                          $divide: [
                            {
                              $divide: [
                                "$reviewInfo.totalScore",
                                "$reviewInfo.totalReviewCount",
                              ],
                            },
                            5,
                          ],
                        },
                        100,
                      ],
                    },
                    1,
                  ],
                },
              },
            },
          },
        },
        {
          $project: {
            password: 0,
            __v: 0,
            loginType:0
          },
        },
      ];

      const userWithReviews = await User.aggregate(aggregation);

      if (!userWithReviews.length) {
        res.status(404).json({
          message: "유저가 존재하지 않습니다.\n로그인 정보를 확인해주세요.",
        });
        return;
      }

      const profile = { ...userWithReviews[0], uid: userWithReviews[0]._id };
      delete profile._id;
      res.status(200).json({
        message: "프로필 조회에 성공했어요.",
        profile,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "프로필 조회에 실패했어요.\n잠시 후 다시 시도해주세요.",
      });
    }
  }
}
