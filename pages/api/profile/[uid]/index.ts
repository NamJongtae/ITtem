import dbConnect from "@/lib/db";
import User from "@/lib/db/models/User";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { uid } = req.query;

      await dbConnect();

      if (!uid) {
        res.status(422).json({ message: "유저 아이디가 없어요." });
        return;
      }

      if (uid.length < 24) {
        res.status(404).json({ message: "유저가 존재하지 않아요." });
        return;
      }

      // 사용자 정보와 리뷰 점수 정보를 조인합니다.
      const aggregation = [
        {
          $match: { _id: new mongoose.Types.ObjectId(uid as string) },
        },
        {
          $lookup: {
            from: "reviewScores", 
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$uid", uid as string] } 
                }
              }
            ],
            as: "reviewInfo" 
          }
        },
        {
          $unwind: {
            path: "$reviewInfo",
            preserveNullAndEmptyArrays: true, // 배열이 비어있거나 없는 경우도 문서 유지
          },
        },
        {
          $addFields: {
            reviewPercentage: {
              $cond: {
                if: {
                  $eq: [{ $ifNull: ["$reviewInfo.totalReviewScore", null] }, null],
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
                                "$reviewInfo.totalReviewScore",
                                "$reviewInfo.totalReviewCount",
                              ],
                            },
                            5,
                          ],
                        },
                        100,
                      ],
                    },
                    1, // 소수점 첫째 자리까지 반올림
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
        res.status(404).json({ message: "유저가 존재하지 않아요." });
        return;
      }

      const profile = { ...userWithReviews[0], uid: userWithReviews[0]._id };
      res
        .status(200)
        .json({ message: "유저 프로필 조회에 성공했어요.", profile });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "유저 프로필 조회에 실패했어요.\n잠시 후 다시 시도해주세요.",
      });
    }
  }
}
