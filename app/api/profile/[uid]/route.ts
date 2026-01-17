import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/shared/common/utils/db/db";
import User from "@/domains/auth/shared/common/models/User";
import mongoose from "mongoose";
import * as Sentry from "@sentry/nextjs";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ uid: string | undefined }> }
) {
  try {
    const { uid } = await params;

    if (!uid) {
      return NextResponse.json(
        { message: "유저 ID가 없어요." },
        { status: 422 }
      );
    }

    if (uid.length < 24) {
      return NextResponse.json(
        { message: "유저가 존재하지 않아요." },
        { status: 404 }
      );
    }

    await dbConnect();

    const targetUserId = new mongoose.Types.ObjectId(uid);

    const aggregation: any[] = [
      { $match: { _id: targetUserId } },

      /** 리뷰 정보 */
      {
        $lookup: {
          from: "reviewScores",
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$uid", uid] }
              }
            },
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

      /** followersCount */
      {
        $lookup: {
          from: "follows",
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$followingId", "$$userId"] }
              }
            },
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

      /** followingsCount */
      {
        $lookup: {
          from: "follows",
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$followerId", "$$userId"] }
              }
            },
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

      /** 불필요 필드 제거 */
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

    if (!result.length) {
      return NextResponse.json(
        { message: "유저가 존재하지 않아요." },
        { status: 404 }
      );
    }

    const profile = {
      ...result[0],
      uid: result[0]._id
    };
    delete profile._id;

    return NextResponse.json({
      message: "유저 프로필 조회에 성공했어요.",
      profile
    });
  } catch (error) {
    console.error("유저 프로필 조회 에러:", error);
    Sentry.captureException(error);
    return NextResponse.json(
      { message: "유저 프로필 조회에 실패했어요.\n잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
