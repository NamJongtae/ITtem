import dbConnect from "@/shared/common/utils/db/db";
import checkAuthorization from "@/domains/auth/shared/common/utils/checkAuthorization";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/domains/auth/shared/common/models/User";
import deleteProfileImgToFirestore from "@/domains/user/profile/utils/deleteProfileImgToFirestore";
import { ProfileData } from "@/domains/user/profile/types/profileTypes";

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

    await dbConnect();

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
      {
        $project: {
          password: 0,
          __v: 0,
          loginType: 0
        }
      }
    ];

    const userWithReviews = await User.aggregate(aggregation);

    if (!userWithReviews.length) {
      return NextResponse.json(
        {
          message: "유저가 존재하지 않습니다.\n로그인 정보를 확인해주세요.",
          profile: {}
        },
        { status: 200 }
      );
    }

    const profile = { ...userWithReviews[0], uid: userWithReviews[0]._id };
    delete profile._id;

    return NextResponse.json(
      { message: "프로필 조회에 성공했어요.", profile },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
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

    await dbConnect();
    let checkDuplicationNickname;

    if (profileEditData.nickname) {
      if (/^[a-zA-Z]+$/.test(profileEditData.nickname)) {
        // 영문으로만 구성된 닉네임인 경우
        checkDuplicationNickname = await User.findOne({
          nickname: { $regex: new RegExp(profileEditData.nickname, "i") }
        });
      } else {
        // 한글로만 구성된 닉네임인 경우, 숫자 또는 한글, 영문, 숫자가 섞여있는 닉네임인 경우
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

    if (profileEditData.profileImgFilename && profile.profileImgFilename) {
      try {
        await deleteProfileImgToFirestore(
          profileEditData.profileImgFilename,
          profile.profileImgFilename
        );
      } catch (error) {
        console.error("프로필 이미지 삭제에 실패했어요.", error);
      }
    }

    const profileUpdateResult = (await User.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(myUid)
      },
      { $set: profileEditData },
      { returnNewDocument: true }
    )) as ProfileData | undefined;

    if (!profileUpdateResult) {
      return NextResponse.json(
        { message: "프로필 수정에 실패했어요.\n잠시 후 다시 시도해주세요." },
        { status: 500 }
      );
    }

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
    return NextResponse.json(
      { message: "프로필 수정에 실패했어요.\n잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
