import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/db/db";
import User from "@/lib/db/models/User";
import { checkAuthorization } from "@/lib/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { uid: string | undefined } }
) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { uid } = params;

    if (!uid) {
      return NextResponse.json(
        {
          message: "팔로우할 유저 ID가 없어요.",
        },
        { status: 422 }
      );
    }

    const isValidAuth = await checkAuthorization();

    if (!isValidAuth.isValid) {
      return NextResponse.json(
        {
          message: isValidAuth.message,
        },
        { status: 401 }
      );
    }

    await dbConnect();

    const myUid = isValidAuth?.auth?.uid;

    if (myUid === uid) {
      return NextResponse.json(
        {
          message: "자신을 팔로우 할 수 없어요.",
        },
        { status: 409 }
      );
    }

    const my = await User.findOne({
      _id: new mongoose.Types.ObjectId(myUid),
    });

    const user = await User.findOne({
      _id: new mongoose.Types.ObjectId(uid as string),
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "유저가 존재하지 않아요.",
        },
        { status: 404 }
      );
    }

    if (my.followings.includes(uid) && user.followers.includes(myUid)) {
      return NextResponse.json(
        { message: "이미 팔로우한 유저입니다." },
        { status: 409 }
      );
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
      if (!myUpdateResult.acknowledged || myUpdateResult.modifiedCount === 0) {
        throw new Error("자신의 following 목록에 상대 uid 추가를 실패했어요.");
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
        throw new Error("상대방의 follower 목록에 나의 uid 추가를 실패했어요.");
      }
    }
    await session.commitTransaction();
    session.endSession();
    return NextResponse.json(
      { message: "유저 팔로우에 성공했어요." },
      { status: 200 }
    );
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    return NextResponse.json(
      {
        message: "유저 팔로우에 실패했어요.\n잠시 후 다시 시도해주세요.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { uid: string | undefined } }
) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { uid } = params;

    if (!uid) {
      return NextResponse.json(
        {
          message: "언팔로우할 유저 ID가 없어요.",
        },
        { status: 422 }
      );
    }

    const isValidAuth = await checkAuthorization();

    if (!isValidAuth.isValid) {
      return NextResponse.json(
        {
          message: isValidAuth.message,
        },
        { status: 401 }
      );
    }

    await dbConnect();

    const myUid = isValidAuth?.auth?.uid;

    if (myUid === uid) {
      return NextResponse.json(
        {
          message: "자신을 언팔로우 할 수 없어요.",
        },
        { status: 409 }
      );
    }

    const my = await User.findOne({
      _id: new mongoose.Types.ObjectId(myUid),
    });

    const user = await User.findOne({
      _id: new mongoose.Types.ObjectId(uid as string),
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "유저가 존재하지 않아요.",
        },
        { status: 404 }
      );
    }

    if (!my.followings.includes(uid) && !user.followers.includes(myUid)) {
      return NextResponse.json(
        { message: "이미 언팔로우한 유저입니다." },
        { status: 409 }
      );
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
      if (!myUpdateResult.acknowledged || myUpdateResult.modifiedCount === 0) {
        throw new Error("자신의 following 목록에 상대 uid 삭제를 실패했어요.");
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
        throw new Error("상대방의 follower 목록에 나의 uid 삭제를 실패했어요.");
      }
    }
    await session.commitTransaction();
    session.endSession();
    return NextResponse.json(
      { message: "유저 언팔로우에 성공했어요." },
      { status: 200 }
    );
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    return NextResponse.json(
      {
        message: "유저 언팔로우에 실패했어요.\n잠시 후 다시 시도해주세요.",
      },
      { status: 500 }
    );
  }
}
