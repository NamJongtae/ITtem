import { exitChatRoom } from "@/lib/api/firebase";
import { checkAuthorization } from "@/lib/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  {
    params
  }: {
    params: Promise<{ chatRoomId: string | undefined }>;
  }
) {
  try {
    const { chatRoomId } = await params;

    if (!chatRoomId) {
      return new NextResponse(
        JSON.stringify({ message: "채팅방 ID가 없어요." }),
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

    const myUid = isValidAuth?.auth?.uid || "";

    await exitChatRoom({ myUid, chatRoomId });

    return new NextResponse(
      JSON.stringify({ message: "채팅방 나가기에 성공했어요." }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      if (error.message === "존재하지 않는 채팅방이에요.") {
        return new NextResponse(JSON.stringify({ message: error.message }), {
          status: 404
        });
      } else if (error.message === "잘못된 접근이에요.") {
        return new NextResponse(JSON.stringify({ message: error.message }), {
          status: 403
        });
      }
    }
    return new NextResponse(
      JSON.stringify({
        message: "채팅방 나가기에 실패했어요.\n잠시 후 다시 시도해주세요."
      }),
      { status: 500 }
    );
  }
}
