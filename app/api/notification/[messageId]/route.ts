import checkAuthorization from "@/domains/auth/shared/common/utils/checkAuthorization";
import readyNotificationMessageInFirebase from "@/domains/notification/utils/readNotificationMessageInFirebase";
import deleteNotificationMessageInFirebase from "@/domains/notification/utils/deleteNotificationMessageInFirebase";
import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

export async function PATCH(
  req: NextRequest,
  {
    params
  }: {
    params: Promise<{ messageId: string | undefined }>;
  }
) {
  try {
    const { messageId } = await params;

    const isValidAuth = await checkAuthorization();

    if (!isValidAuth.isValid) {
      return new NextResponse(
        JSON.stringify({ message: isValidAuth.message }),
        { status: 401 }
      );
    }

    const myUid = isValidAuth?.auth?.uid || "";

    await readyNotificationMessageInFirebase({
      userId: myUid,
      messageId: messageId || ""
    });

    return new NextResponse(
      JSON.stringify({ message: "알림 메세지를 읽음 처리에 성공했어요." }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
    if (error instanceof Error && error.message === "잘못된 접근이에요.") {
      return new NextResponse(JSON.stringify({ message: error.message }), {
        status: 403
      });
    }
    return new NextResponse(
      JSON.stringify({
        message:
          "알림 메세지 읽음 처리에 실패했어요.\n잠시 후 다시 시도해주세요."
      }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  {
    params
  }: {
    params: Promise<{ messageId: string | undefined }>;
  }
) {
  try {
    const { messageId } = await params;

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

    await deleteNotificationMessageInFirebase({
      userId: myUid,
      messageId: messageId || ""
    });

    return new NextResponse(
      JSON.stringify({ message: "알림 메세지 삭제에 성공했어요." }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
    if (error instanceof Error && error.message === "잘못된 접근이에요.") {
      return new NextResponse(JSON.stringify({ message: error.message }), {
        status: 403
      });
    }
    return new NextResponse(
      JSON.stringify({
        message: "알림 메세지 삭제에 실패했어요.\n잠시 후 다시 시도해주세요."
      }),
      { status: 500 }
    );
  }
}
