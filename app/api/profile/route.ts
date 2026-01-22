import checkAuthorization from "@/domains/auth/shared/common/utils/checkAuthorization";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/domains/auth/shared/common/models/User";
import deleteProfileImgToFirestore from "@/domains/user/profile/utils/deleteProfileImgToFirestore";
import { ProfileData } from "@/domains/user/profile/types/profileTypes";
import * as Sentry from "@sentry/nextjs";
import { revalidatePath, revalidateTag } from "next/cache";
import Wish from "@/domains/product/shared/models/Wish";

export async function GET() {
  try {
    const isValidAuth = await checkAuthorization();

    if (!isValidAuth.isValid) {
      return NextResponse.json(
        { message: isValidAuth.message },
        { status: 401 }
      );
    }

    const myUid = isValidAuth?.auth?.uid;

    const aggregation = [
      {
        $match: { _id: new mongoose.Types.ObjectId(myUid as string) }
      },
      {
        $lookup: {
          from: "reviewScores",
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$uid", myUid as string] }
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

      // followers count
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

      // followings count
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

      {
        $project: {
          password: 0,
          __v: 0,
          loginType: 0
        }
      }
    ];

    const [userWithReviews, wishCount] = await Promise.all([
      User.aggregate(aggregation),
      Wish.countDocuments({
        userId: new mongoose.Types.ObjectId(myUid as string)
      })
    ]);

    if (!userWithReviews.length) {
      return NextResponse.json(
        {
          message: "유저가 존재하지 않습니다.\n로그인 정보를 확인해주세요.",
          profile: {}
        },
        { status: 200 }
      );
    }

    const profile = {
      ...userWithReviews[0],
      uid: userWithReviews[0]._id,
      wishCount
    };
    delete profile._id;

    return NextResponse.json(
      { message: "프로필 조회에 성공했어요.", profile },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
    return NextResponse.json(
      { message: "프로필 조회에 실패했어요.\n잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { profileEditData } = await req.json();

    if (!profileEditData) {
      return NextResponse.json(
        { message: "프로필 데이터가 없어요." },
        { status: 422 }
      );
    }

    const isValidAuth = await checkAuthorization();

    if (!isValidAuth.isValid) {
      return NextResponse.json(
        { message: isValidAuth.message },
        { status: 401 }
      );
    }

    const myUid = isValidAuth?.auth?.uid;

    let checkDuplicationNickname;

    if (profileEditData.nickname) {
      if (/^[a-zA-Z]+$/.test(profileEditData.nickname)) {
        checkDuplicationNickname = await User.findOne({
          nickname: { $regex: new RegExp(profileEditData.nickname, "i") }
        });
      } else {
        checkDuplicationNickname = await User.findOne({
          nickname: {
            $regex: new RegExp(`^${profileEditData.nickname}$`, "i")
          }
        });
      }
      if (checkDuplicationNickname) {
        return NextResponse.json(
          { message: "중복된 닉네임 입니다." },
          { status: 401 }
        );
      }
    }

    const profile = await User.findOne({
      _id: new mongoose.Types.ObjectId(myUid)
    });

    if (profile.profileImgFilename) {
      try {
        await deleteProfileImgToFirestore(profile.profileImgFilename);
      } catch (error) {
        console.error("프로필 이미지 삭제에 실패했어요.", error);
      }
    }

    const profileUpdateResult = (await User.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(myUid) },
      { $set: profileEditData },
      { returnNewDocument: true }
    )) as ProfileData | undefined;

    if (!profileUpdateResult) {
      return NextResponse.json(
        { message: "프로필 수정에 실패했어요.\n잠시 후 다시 시도해주세요." },
        { status: 500 }
      );
    }

    revalidatePath(`/profile/${myUid}`);
    revalidateTag(`profile-${myUid}`, { expire: 60 });

    return NextResponse.json({
      message: "프로필을 수정했어요.",
      profile: {
        profileImg: profileUpdateResult?.profileImg,
        nickname: profileUpdateResult?.nickname,
        introduce: profileUpdateResult?.introduce
      }
    });
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
    return NextResponse.json(
      { message: "프로필 수정에 실패했어요.\n잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
