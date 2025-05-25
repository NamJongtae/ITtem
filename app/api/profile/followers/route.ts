import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/shared/common/utils/db/db";
import User from "@/domains/auth/shared/common/models/User";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  try {
    const { userIds } = await req.json();
    const { searchParams } = req.nextUrl;
    const cursor = searchParams.get("cursor");
    const limit = searchParams.get("limit");

    if (!userIds) {
      return NextResponse.json(
        { message: "팔로워 유저 ID 목록이 존재하지 않아요." },
        { status: 422 }
      );
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
            $gt: new mongoose.Types.ObjectId(cursor as string)
          }
        }
      };
    } else {
      matchStage = {
        $match: {
          _id: {
            $in: objectIdArray
          }
        }
      };
    }

    const aggregation = [
      matchStage,
      {
        $lookup: {
          from: "reviewScore",
          localField: "_id",
          foreignField: "_id",
          as: "reviewInfo"
        }
      },
      {
        $limit: pageLimit
      },
      {
        $unwind: {
          path: "$reviewInfo",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $addFields: {
          reviewPercentage: {
            $cond: {
              if: {
                $eq: [{ $ifNull: ["$reviewInfo.totalScore", null] }, null]
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
                              "$reviewInfo.totalReviewCount"
                            ]
                          },
                          5
                        ]
                      },
                      100
                    ]
                  },
                  1
                ]
              }
            }
          },
          uid: "$_id"
        }
      },
      {
        $project: {
          nickname: 1,
          profileImg: 1,
          followers: 1,
          followings: 1,
          reviewPercentage: 1,
          uid: 1,
          productIds: 1
        }
      }
    ];

    const followers = await User.aggregate(aggregation)
      .limit(pageLimit)
      .sort({ _id: 1 });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const newFollowers = followers.map(({ _id, ...rest }) => rest);

    return NextResponse.json({
      message: "팔로워 목록 조회에 성공했어요.",
      followers: newFollowers
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "팔로워 목록 조회에 실패했어요.\n잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
