import sendToChatMessageInFirebase from "@/domains/chat/room/utils/sendChatMessageInFirebase";
import checkAuthorization from "@/domains/auth/shared/common/utils/checkAuthorization";
import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ chatRoomId: string | undefined }> }
) {
  try {
    const { chatRoomId } = await params;

    if (!chatRoomId) {
      return new NextResponse(
        JSON.stringify({ message: "채팅방 ID가 없어요." }),
        { status: 422 }
      );
    }

    const body = await req.json();
    const { message } = body;

    if (!message) {
      return new NextResponse(
        JSON.stringify({ message: "전송할 메세지가 없어요." }),
        { status: 422 }
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

    await sendToChatMessageInFirebase({
      myUid: myUid as string,
      message,
      chatRoomId: chatRoomId as string
    });

    return new NextResponse(
      JSON.stringify({ message: "메세지 전송에 성공했어요." }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
    if (error instanceof Error) {
      if (error.message === "존재하지 않는 채팅방이에요.") {
        return new NextResponse(JSON.stringify({ message: error.message }), {
          status: 404
        });
      }
      if (error.message === "잘못된 접근이에요.") {
        return new NextResponse(JSON.stringify({ message: error.message }), {
          status: 403
        });
      }
    }
    return new NextResponse(
      JSON.stringify({
        message: "메세지 전송에 실패했어요.\n잠시 후 다시 시도해주세요."
      }),
      { status: 500 }
    );
  }
}
