import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import * as Sentry from "@sentry/nextjs";
import checkAuthorization from "@/domains/auth/shared/common/utils/checkAuthorization";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ uid: string | undefined }> }
) {
  try {
    const { uid } = await params;

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

    const auth = await checkAuthorization();
    const myUid = auth?.isValid && auth.auth?.uid ? auth.auth.uid : null;

    // 로그인 안 했거나, 내 프로필이면 팔로우 상태는 false로 통일
    if (!myUid || myUid === uid) {
      return NextResponse.json({
        message: "팔로우 상태 조회에 성공했어요.",
        isFollow: false
      });
    }

    const followExists = await mongoose.connection
      .collection("follows")
      .findOne({
        followerId: new mongoose.Types.ObjectId(myUid),
        followingId: new mongoose.Types.ObjectId(uid)
      });

    return NextResponse.json({
      message: "팔로우 상태 조회에 성공했어요.",
      isFollow: !!followExists
    });
  } catch (error) {
    console.error("팔로우 상태 조회 에러:", error);
    Sentry.captureException(error);
    return NextResponse.json(
      { message: "팔로우 상태 조회에 실패했어요.\n잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
