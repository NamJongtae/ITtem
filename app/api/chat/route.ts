import startChatInFirebase from "@/domains/product/shared/utils/startChatInFirebase";
import checkAuthorization from "@/domains/auth/shared/common/utils/checkAuthorization";
import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

export async function POST(req: NextRequest) {
  try {
    const { productId, userId } = await req.json();

    if (!productId) {
      return new NextResponse(
        JSON.stringify({ message: "상품 ID가 없어요." }),
        {
          status: 422
        }
      );
    }

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ message: "유저 ID가 없어요." }),
        {
          status: 422
        }
      );
    }

    const isValidAuth = await checkAuthorization();

    if (!isValidAuth.isValid) {
      return new NextResponse(
        JSON.stringify({ message: isValidAuth.message }),
        { status: 401 }
      );
    }

    const myUid = isValidAuth?.auth?.uid;

    if (!myUid) {
      return new NextResponse(
        JSON.stringify({ message: "유저 ID가 없어요." }),
        { status: 400 }
      );
    }

    const { chatRoomId, isExistRoom } = await startChatInFirebase({
      productId,
      myUid,
      userId
    });

    return new NextResponse(
      JSON.stringify({
        message: `${
          isExistRoom
            ? "채팅방 조회에 성공했어요."
            : "채팅방 생성 및 조회에 성공했어요."
        } `,
        chatRoomId
      }),
      { status: isExistRoom ? 200 : 201 }
    );
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
    return new NextResponse(
      JSON.stringify({
        message: "채팅방 생성/조회에 실패했어요.\n잠시 후 다시 시도해주세요."
      }),
      { status: 500 }
    );
  }
}
