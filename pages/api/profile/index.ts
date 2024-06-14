import dbConnect from "@/lib/db";
import User from "@/lib/db/models/User";
import { checkAuthorization } from "@/lib/server";
import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { deleteProfileImgToFirestore } from "@/lib/api/firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      await dbConnect();

      const isValidAuth = await checkAuthorization(req, res);

      if (!isValidAuth.isValid) {
        res.status(401).json({
          message: isValidAuth.message,
        });
        return;
      }

      const myUid = isValidAuth?.auth?.uid;

      const aggregation = [
        {
          $match: { _id: new mongoose.Types.ObjectId(myUid as string) },
        },
        {
          $lookup: {
            from: "reviewScores",
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$uid", myUid as string] },
                },
              },
              {
                $addFields: {
                  reviewPercentage: {
                    $round: [
                      {
                        $multiply: [
                          {
                            $divide: ["$totalReviewScore", "$totalReviewCount"],
                          },
                          20,
                        ],
                      },
                      1,
                    ],
                  },
                },
              },
              {
                $project: {
                  _id: 0,
                  uid: 0,
                },
              },
            ],
            as: "reviewInfo",
          },
        },
        {
          $unwind: {
            path: "$reviewInfo",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            password: 0,
            __v: 0,
            loginType: 0,
          },
        },
      ];

      const userWithReviews = await User.aggregate(aggregation);

      if (!userWithReviews.length) {
        res.status(404).json({
          message: "유저가 존재하지 않습니다.\n로그인 정보를 확인해주세요.",
        });
        return;
      }

      const profile = { ...userWithReviews[0], uid: userWithReviews[0]._id };
      delete profile._id;

      res.status(200).json({
        message: "프로필 조회에 성공했어요.",
        profile,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "프로필 조회에 실패했어요.\n잠시 후 다시 시도해주세요.",
      });
    }
  }
  if (req.method === "PATCH") {
    try {
      const { profileEditData } = req.body;

      if (!profileEditData) {
        res.status(422).json({ message: "프로필 데이터가 없어요." });
        return;
      }

      const isValidAuth = await checkAuthorization(req, res);

      if (!isValidAuth.isValid) {
        res.status(401).json({
          message: isValidAuth.message,
        });
        return;
      }

      const myUid = isValidAuth?.auth?.uid;

      const profile = await User.findOne({
        _id: new mongoose.Types.ObjectId(myUid),
      });

      if (profileEditData.profileImgFilename && profile.profileImgFilename)
        try {
          await deleteProfileImgToFirestore(
            profileEditData.profileImgFilename,
            profile.profileImgFilename
          );
        } catch (error) {
          console.error("프로필 이미지 삭제에 실패했어요.", error);
        }

      const profileUpdateResult = await User.findOneAndUpdate(
        {
          _id: new mongoose.Types.ObjectId(myUid),
        },
        { $set: profileEditData },
        { returnNewDocument: true }
      );

      res.status(200).json({
        message: "프로필을 수정했어요.",
        profile: profileUpdateResult,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "프로필 수정에 실패했어요.\n잠시 후 다시 시도해주세요.",
      });
    }
  } else {
    res.status(405).json({ message: "잘못된 접근이에요." });
  }
}
