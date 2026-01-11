import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/shared/common/utils/db/db";
import User from "@/domains/auth/shared/common/models/User";
import Follow from "@/domains/auth/shared/common/models/Follow";
import checkAuthorization from "@/domains/auth/shared/common/utils/checkAuthorization";
import * as Sentry from "@sentry/nextjs";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ uid: string | undefined }> }
) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { uid } = await params;
    if (!uid) {
      return NextResponse.json(
        { message: "팔로우할 유저 ID가 없어요." },
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

    await dbConnect();

    const myUid = isValidAuth.auth!.uid;

    if (myUid === uid) {
      return NextResponse.json(
        { message: "자기 자신은 팔로우할 수 없어요." },
        { status: 409 }
      );
    }

    // 팔로우 관계 생성
    await Follow.create(
      [
        {
          followerId: new mongoose.Types.ObjectId(myUid),
          followingId: new mongoose.Types.ObjectId(uid)
        }
      ],
      { session }
    );

    await session.commitTransaction();
    return NextResponse.json(
      { message: "유저 팔로우에 성공했어요." },
      { status: 200 }
    );
  } catch (error: any) {
    await session.abortTransaction();

    // 이미 팔로우한 경우 (unique index)
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "이미 팔로우한 유저입니다." },
        { status: 409 }
      );
    }

    Sentry.captureException(error);
    return NextResponse.json(
      { message: "유저 팔로우에 실패했어요." },
      { status: 500 }
    );
  } finally {
    session.endSession();
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ uid: string | undefined }> }
) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { uid } = await params;
    if (!uid) {
      return NextResponse.json(
        { message: "언팔로우할 유저 ID가 없어요." },
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

    await dbConnect();

    const myUid = isValidAuth.auth!.uid;

    console.log(myUid, uid);

    if (myUid === uid) {
      return NextResponse.json(
        { message: "자기 자신은 언팔로우할 수 없어요." },
        { status: 409 }
      );
    }

    const deleteResult = await Follow.deleteOne(
      {
        followerId: new mongoose.Types.ObjectId(myUid),
        followingId: new mongoose.Types.ObjectId(uid)
      },
      { session }
    );

    if (deleteResult.deletedCount === 0) {
      return NextResponse.json(
        { message: "이미 언팔로우한 유저입니다." },
        { status: 409 }
      );
    }

    await session.commitTransaction();
    return NextResponse.json(
      { message: "유저 언팔로우에 성공했어요." },
      { status: 200 }
    );
  } catch (error) {
    await session.abortTransaction();
    Sentry.captureException(error);
    return NextResponse.json(
      { message: "유저 언팔로우에 실패했어요." },
      { status: 500 }
    );
  } finally {
    session.endSession();
  }
}
