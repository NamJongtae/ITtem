import User from "@/domains/auth/shared/common/models/User";
import dbConnect from "@/shared/common/utils/db/db";
import mongoose from "mongoose";
import { unstable_cache } from "next/cache";

export const getUserProfileServer = async (uid: string) => {
  const cachedFn = unstable_cache(
    async () => {
      await dbConnect();

      const targetUserId = new mongoose.Types.ObjectId(uid);

      const aggregation: any[] = [
        { $match: { _id: targetUserId } },

        // 리뷰 정보
        {
          $lookup: {
            from: "reviewScores",
            pipeline: [
              { $match: { $expr: { $eq: ["$uid", uid] } } },
              {
                $addFields: {
                  reviewPercentage: {
                    $round: [
                      {
                        $multiply: [
                          {
                            $cond: [
                              { $eq: ["$totalReviewCount", 0] },
                              0,
                              {
                                $divide: [
                                  "$totalReviewScore",
                                  "$totalReviewCount"
                                ]
                              }
                            ]
                          },
                          20
                        ]
                      },
                      1
                    ]
                  }
                }
              },
              { $project: { _id: 0, uid: 0 } }
            ],
            as: "reviewInfo"
          }
        },
        {
          $unwind: {
            path: "$reviewInfo",
            preserveNullAndEmptyArrays: true
          }
        },

        // followersCount
        {
          $lookup: {
            from: "follows",
            let: { userId: "$_id" },
            pipeline: [
              { $match: { $expr: { $eq: ["$followingId", "$$userId"] } } },
              { $count: "count" }
            ],
            as: "followersCount"
          }
        },
        {
          $addFields: {
            followersCount: {
              $ifNull: [{ $arrayElemAt: ["$followersCount.count", 0] }, 0]
            }
          }
        },

        // followingsCount
        {
          $lookup: {
            from: "follows",
            let: { userId: "$_id" },
            pipeline: [
              { $match: { $expr: { $eq: ["$followerId", "$$userId"] } } },
              { $count: "count" }
            ],
            as: "followingsCount"
          }
        },
        {
          $addFields: {
            followingsCount: {
              $ifNull: [{ $arrayElemAt: ["$followingsCount.count", 0] }, 0]
            }
          }
        },

        // 불필요 필드 제거
        {
          $project: {
            email: 0,
            password: 0,
            __v: 0,
            loginType: 0,
            createdAt: 0,
            chatRoomList: 0,
            profileImgFilename: 0,
            wishProductIds: 0
          }
        }
      ];

      const result = await User.aggregate(aggregation);
      const doc = result[0];
      if (!doc) return undefined;

      const profile: any = { ...doc, uid: doc._id };
      delete profile._id;

      return JSON.parse(JSON.stringify(profile));
    },
    ["getUserProfileServer", uid],
    { revalidate: 60, tags: [`profile:${uid}`] }
  );

  return cachedFn();
};
