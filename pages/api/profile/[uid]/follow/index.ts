import dbConnect from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { User } from "@/lib/db/schema";
import { checkAuthorization } from "@/lib/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const { uid } = req.query;

      if (!uid) {
        res.status(422).json({
          message: "팔로우할 유저 아이디가 없어요.",
        });
        return;
      }

      const isValidAuth = await checkAuthorization(req, res);

      if (!isValidAuth.isValid) {
        res.status(401).json({
          message: isValidAuth.message,
        });
        return;
      }

      await dbConnect();

      const my = await User.findOne({
        _id: new mongoose.Types.ObjectId(isValidAuth.auth.uid as string),
      });

      const user = await User.findOne({
        _id: new mongoose.Types.ObjectId(uid as string),
      });

      const myUid = isValidAuth.auth.uid as string;

      if (!user) {
        res.status(404).json({
          message: "유저가 존재하지 않아요.",
        });
        return;
      }

      if (my.followings.includes(uid) && user.followers.includes(myUid)) {
        res.status(409).json({ message: "이미 팔로우한 유저입니다." });
      }

      if (!my.followings.includes(uid)) {
        // 자신의 followings에 상대방 추가
        const myUpdateResult = await User.updateOne(
          { _id: new mongoose.Types.ObjectId(myUid) },
          {
            $push: { followings: uid },
          },
          { session }
        );
        if (
          !myUpdateResult.acknowledged ||
          myUpdateResult.modifiedCount === 0
        ) {
          throw new Error(
            "자신의 following 목록에 상대 uid 추가를 실패했어요."
          );
        }
      }

      if (!user.followers.includes(myUid)) {
        // 상대방 followers에 나를 추가
        const userUpdateResult = await User.updateOne(
          { _id: new mongoose.Types.ObjectId(uid as string) },
          {
            $push: { followers: myUid },
          },
          { session }
        );

        if (
          !userUpdateResult.acknowledged ||
          userUpdateResult.modifiedCount === 0
        ) {
          throw new Error(
            "상대방의 follower 목록에 나의 uid 추가를 실패했어요."
          );
        }
      }
      await session.commitTransaction();
      session.endSession();
      res.status(200).json({ message: "유저 팔로우에 성공했어요." });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error(error);
      res.status(500).json({
        message: "유저 팔로우에 실패했어요.\n잠시 후 다시 시도해주세요.",
      });
    }
  }

  if (req.method === "DELETE") {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { uid } = req.query;

      if (!uid) {
        res.status(422).json({
          message: "언팔로우할 유저 아이디가 없어요.",
        });
        return;
      }

      const isValidAuth = await checkAuthorization(req, res);

      if (!isValidAuth.isValid) {
        res.status(401).json({
          message: isValidAuth.message,
        });
        return;
      }

      await dbConnect();

      const my = await User.findOne({
        _id: new mongoose.Types.ObjectId(isValidAuth.auth.uid as string),
      });

      const user = await User.findOne({
        _id: new mongoose.Types.ObjectId(uid as string),
      });

      const myUid = isValidAuth.auth.uid as string;

      if (!user) {
        res.status(404).json({
          message: "유저가 존재하지 않아요.",
        });
        return;
      }

      if (!my.followings.includes(uid) && !user.followers.includes(myUid)) {
        res.status(409).json({ message: "이미 삭제된 유저입니다." });
      }

      if (my.followings.includes(uid)) {
        // 자신의 followings에 상대방 삭제
        const myUpdateResult = await User.updateOne(
          { _id: new mongoose.Types.ObjectId(myUid) },
          {
            $pull: { followings: uid },
          },
          { session }
        );
        if (
          !myUpdateResult.acknowledged ||
          myUpdateResult.modifiedCount === 0
        ) {
          throw new Error(
            "자신의 following 목록에 상대 uid 삭제를 실패했어요."
          );
        }
      }

      if (user.followers.includes(myUid)) {
        // 상대방 followers에 나를 삭제
        const userUpdateResult = await User.updateOne(
          { _id: new mongoose.Types.ObjectId(uid as string) },
          {
            $pull: { followers: myUid },
          },
          { session }
        );

        if (
          !userUpdateResult.acknowledged ||
          userUpdateResult.modifiedCount === 0
        ) {
          throw new Error(
            "상대방의 follower 목록에 나의 uid 삭제를 실패했어요."
          );
        }
      }
      await session.commitTransaction();
      session.endSession();
      res.status(200).json({ message: "유저 언팔로우에 성공했어요." });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error(error);
      res.status(500).json({
        message: "유저 언팔로우에 실패했어요.\n잠시 후 다시 시도해주세요.",
      });
    }
  }
}
