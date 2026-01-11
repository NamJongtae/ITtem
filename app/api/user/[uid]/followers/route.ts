import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/shared/common/utils/db/db";
import Follow from "@/domains/auth/shared/common/models/Follow";
import * as Sentry from "@sentry/nextjs";
import checkAuthorization from "@/domains/auth/shared/common/utils/checkAuthorization";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ uid: string | undefined }> }
) {
  try {
    const { uid } = await params;
    const { searchParams } = req.nextUrl;

    const cursor = searchParams.get("cursor");
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    if (!uid) {
      return NextResponse.json(
        { message: "유저 ID가 없어요." },
        { status: 422 }
      );
    }

    await dbConnect();

    const match: any = {
      followingId: new mongoose.Types.ObjectId(uid)
    };

    if (cursor) {
      match._id = { $lt: new mongoose.Types.ObjectId(cursor) }; // 최신순
    }

    const auth = await checkAuthorization();
    const myUid =
      auth?.isValid && auth.auth?.uid
        ? new mongoose.Types.ObjectId(auth.auth.uid)
        : null;

    const followers = await Follow.aggregate([
      { $match: match },
      { $sort: { _id: -1 } }, // 최신순 정렬
      { $limit: limit },

      // ✅ 유저 정보
      {
        $lookup: {
          from: "users",
          localField: "followerId",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },

      // ✅ 리뷰 점수
      {
        $lookup: {
          from: "reviewScores",
          let: {
            userIdObj: "$user._id",
            userIdStr: { $toString: "$user._id" }
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $or: [
                    { $eq: ["$uid", "$$userIdObj"] },
                    { $eq: ["$uid", "$$userIdStr"] }
                  ]
                }
              }
            },
            { $limit: 1 }
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

      // ✅ isFollow 계산
      ...(myUid
        ? [
            {
              $lookup: {
                from: "follows",
                let: { followerId: myUid, followingId: "$user._id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          { $eq: ["$followerId", "$$followerId"] },
                          { $eq: ["$followingId", "$$followingId"] }
                        ]
                      }
                    }
                  },
                  { $limit: 1 }
                ],
                as: "isFollowCheck"
              }
            },
            {
              $addFields: {
                isFollow: { $gt: [{ $size: "$isFollowCheck" }, 0] }
              }
            }
          ]
        : [{ $addFields: { isFollow: false } }]),

      // ✅ followersCount
      {
        $lookup: {
          from: "follows",
          localField: "user._id",
          foreignField: "followingId",
          as: "followersList"
        }
      },
      { $addFields: { followersCount: { $size: "$followersList" } } },

      // ✅ followingsCount
      {
        $lookup: {
          from: "follows",
          localField: "user._id",
          foreignField: "followerId",
          as: "followingsList"
        }
      },
      { $addFields: { followingsCount: { $size: "$followingsList" } } },

      // ✅ 리뷰 퍼센트 계산
      {
        $addFields: {
          reviewPercentage: {
            $cond: [
              { $gt: [{ $ifNull: ["$reviewInfo.totalReviewCount", 0] }, 0] },
              {
                $round: [
                  {
                    $multiply: [
                      {
                        $divide: [
                          "$reviewInfo.totalReviewScore",
                          "$reviewInfo.totalReviewCount"
                        ]
                      },
                      20
                    ]
                  },
                  1
                ]
              },
              0
            ]
          },
          uid: "$user._id"
        }
      },

      // ✅ 최종 응답 필드
      {
        $project: {
          _id: 0,
          uid: 1,
          nickname: "$user.nickname",
          profileImg: "$user.profileImg",
          productIds: "$user.productIds",
          reviewPercentage: 1,
          createdAt: 1,
          isFollow: 1,
          followersCount: 1,
          followingsCount: 1
        }
      }
    ]);

    return NextResponse.json({
      message: "팔로워 목록 조회에 성공했어요.",
      followers
    });
  } catch (error) {
    Sentry.captureException(error);
    return NextResponse.json(
      { message: "팔로워 목록 조회에 실패했어요." },
      { status: 500 }
    );
  }
}
