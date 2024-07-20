import {
  deleteNotificationMessage,
  readyNotificationMessage,
} from "@/lib/api/firebase";
import { checkAuthorization } from "@/lib/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { messageId: string | undefined } }
) {
  try {
    const { messageId } = params;

    const isValidAuth = await checkAuthorization();

    if (!isValidAuth.isValid) {
      return new NextResponse(
        JSON.stringify({ message: isValidAuth.message }),
        { status: 401 }
      );
    }

    const myUid = isValidAuth?.auth?.uid || "";

    await readyNotificationMessage({
      userId: myUid,
      messageId: messageId || "",
    });

    return new NextResponse(
      JSON.stringify({ message: "알림 메세지를 읽음 처리에 성공했어요." }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    if (error instanceof Error && error.message === "잘못된 접근이에요.") {
      return new NextResponse(JSON.stringify({ message: error.message }), {
        status: 403,
      });
    }
    return new NextResponse(
      JSON.stringify({
        message:
          "알림 메세지 읽음 처리에 실패했어요.\n잠시 후 다시 시도해주세요.",
      }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { messageId: string | undefined } }
) {
  try {
    const { messageId } = params;

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
        JSON.stringify({ message: "유저 ID가 존재하지 않아요." }),
        { status: 403 }
      );
    }

    await deleteNotificationMessage({
      userId: myUid,
      messageId: messageId || "",
    });

    return new NextResponse(
      JSON.stringify({ message: "알림 메세지 삭제에 성공했어요." }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    if (error instanceof Error && error.message === "잘못된 접근이에요.") {
      return new NextResponse(JSON.stringify({ message: error.message }), {
        status: 403,
      });
    }
    return new NextResponse(
      JSON.stringify({
        message: "알림 메세지 삭제에 실패했어요.\n잠시 후 다시 시도해주세요.",
      }),
      { status: 500 }
    );
  }
}
