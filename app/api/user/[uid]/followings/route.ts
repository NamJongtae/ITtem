import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
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

    /** 팔로잉 목록 = followerId가 uid */
    const match: any = {
      followerId: new mongoose.Types.ObjectId(uid)
    };

    if (cursor) {
      match._id = { $gt: new mongoose.Types.ObjectId(cursor) };
    }

    /** 로그인 유저 (isFollow 판단용) */
    const auth = await checkAuthorization();
    const myUid =
      auth?.isValid && auth.auth?.uid
        ? new mongoose.Types.ObjectId(auth.auth.uid)
        : null;

    const followings = await Follow.aggregate([
      { $match: match },
      { $sort: { _id: -1 } },
      { $limit: limit },

      // followingId → User
      {
        $lookup: {
          from: "users",
          localField: "followingId",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },

      /**
       * ✅ 리뷰 점수 조인 (타입 안전 버전)
       * - reviewScores.uid 가 ObjectId / string 둘 다 대응
       */
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

      // 내가 이 유저를 팔로우 중인지
      ...(myUid
        ? [
            {
              $lookup: {
                from: "follows",
                let: { myId: myUid, targetId: "$user._id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          { $eq: ["$followerId", "$$myId"] },
                          { $eq: ["$followingId", "$$targetId"] }
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
        : [
            {
              $addFields: {
                isFollow: false
              }
            }
          ]),

      // 해당 유저의 팔로워 수
      {
        $lookup: {
          from: "follows",
          localField: "user._id",
          foreignField: "followingId",
          as: "followersList"
        }
      },
      {
        $addFields: {
          followersCount: { $size: "$followersList" }
        }
      },

      // 해당 유저의 팔로잉 수
      {
        $lookup: {
          from: "follows",
          localField: "user._id",
          foreignField: "followerId",
          as: "followingsList"
        }
      },
      {
        $addFields: {
          followingsCount: { $size: "$followingsList" }
        }
      },

      // 파생 필드
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

      // 최종 응답
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
      message: "팔로잉 목록 조회에 성공했어요.",
      followings
    });
  } catch (error) {
    Sentry.captureException(error);
    return NextResponse.json(
      { message: "팔로잉 목록 조회에 실패했어요." },
      { status: 500 }
    );
  }
}
