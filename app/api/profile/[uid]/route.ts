import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/shared/common/utils/db/db";
import User from "@/domains/auth/shared/common/models/User";
import mongoose from "mongoose";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ uid: string | undefined }> }
) {
  try {
    const { uid } = await params;

    await dbConnect();

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

    // 사용자 정보와 리뷰 점수 정보를 조인합니다.
    const aggregation = [
      {
        $match: { _id: new mongoose.Types.ObjectId(uid) }
      },
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
                          $divide: ["$totalReviewScore", "$totalReviewCount"]
                        },
                        20
                      ]
                    },
                    1
                  ]
                }
              }
            },
            {
              $project: {
                _id: 0,
                uid: 0
              }
            }
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
      {
        $project: {
          email: 0,
          password: 0,
          __v: 0,
          loginType: 0,
          createdAt: 0,
          chatRoomList: 0,
          profileImgFilename: 0,
          wishProductIds: 0,
          "reviewInfo.__v": 0
        }
      }
    ];

    const userWithReviews = await User.aggregate(aggregation);

    if (userWithReviews.length === 0) {
      return NextResponse.json(
        { message: "유저가 존재하지 않아요." },
        { status: 404 }
      );
    }

    const profile = { ...userWithReviews[0], uid: userWithReviews[0]._id };
    delete profile._id;

    return NextResponse.json({
      message: "유저 프로필 조회에 성공했어요.",
      profile
    });
  } catch (error) {
    console.error("유저 프로필 조회 에러:", error);
    return NextResponse.json(
      { message: "유저 프로필 조회에 실패했어요.\n잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
