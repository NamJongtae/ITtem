import dbConnect from "@/lib/db";
import User from "@/lib/db/models/User";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { userIds } = req.body;
      const { cursor, limit } = req.query;

      if (!userIds) {
        res
          .status(422)
          .json({ message: "팔로워 유저 ID 목록이 존재하지 않아요." });
        return;
      }

      await dbConnect();

      const pageLimit = parseInt(limit as string, 10) || 10;
      const objectIdArray = userIds.map(
        (id: string) => new mongoose.Types.ObjectId(id)
      );

      let matchStage;
      if (cursor) {
        matchStage = {
          $match: {
            _id: {
              $in: objectIdArray,
              $gt: new mongoose.Types.ObjectId(cursor as string),
            },
          },
        };
      } else {
        matchStage = {
          $match: {
            _id: {
              $in: objectIdArray,
            },
          },
        };
      }

      const aggregation = [
        matchStage,
        {
          $lookup: {
            from: "reviewScore",
            localField: "_id",
            foreignField: "_id",
            as: "reviewInfo",
          },
        },
        {
          $limit: pageLimit,
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
            uid: "$_id",
          },
        },
        {
          $project: {
            nickname: 1,
            profileImg: 1,
            followers: 1,
            followings: 1,
            reviewPercentage: 1,
            uid: 1,
            productIds: 1,
          },
        },
      ];

      const followers = await User.aggregate(aggregation)
        .limit(pageLimit)
        .sort({ _id: 1 });

      if (!followers.length) {
        res.status(404).json({ message: "팔로워 목록이 존재하지 않아요." });
        return;
      }

      const newFollowers = followers.map(({ _id, ...rest }) => rest);

      res.status(200).json({
        message: "팔로워 목록 조회에 성공했어요.",
        followers: newFollowers,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "팔로워 목록 조회에 실패했어요.\n잠시 후 다시 시도해주세요.",
      });
    }
  }
}
