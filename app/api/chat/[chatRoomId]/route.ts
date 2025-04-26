import { deleteChatRoom } from "@/lib/api/firebase";
import { checkAuthorization } from "@/lib/server";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
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

    await deleteChatRoom(chatRoomId);

    return new NextResponse(
      JSON.stringify({ message: "채팅방 삭제에 성공했어요." }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      if (error.message === "존재하지 않는 채팅방이에요.") {
        return new NextResponse(JSON.stringify({ message: error.message }), {
          status: 404
        });
      } else if (
        error.message === "채팅방 참여 인원이 있어 채팅방을 삭제할 수 없어요."
      ) {
        return new NextResponse(JSON.stringify({ message: error.message }), {
          status: 409
        });
      }
    }
    return new NextResponse(
      JSON.stringify({
        message: "채팅방 삭제에 실패했어요.\n잠시 후 다시 시도해주세요."
      }),
      { status: 500 }
    );
  }
}
