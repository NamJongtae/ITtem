import { NextRequest, NextResponse } from "next/server";
import {
  deleteAllNotificationMessage,
  getNotificationMessage,
  readAllNotificationMessage
} from "@/shared/common/utils/api/firebase";
import checkAuthorization from "@/domains/auth/shared/common/utils/checkAuthorization";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const lastKey = searchParams.get("lastKey");
    const limit = searchParams.get("limit");
    const currentLimit = limit ? parseInt(limit, 10) : 10;

    const isValidAuth = await checkAuthorization();

    if (!isValidAuth.isValid) {
      return NextResponse.json(
        { message: isValidAuth.message },
        { status: 401 }
      );
    }

    const myUid = isValidAuth?.auth?.uid;

    if (!myUid) {
      return NextResponse.json(
        { message: "유저 ID가 존재하지 않아요." },
        { status: 400 }
      );
    }

    const { messages, nextKey } = await getNotificationMessage({
      userId: myUid,
      lastKey,
      limit: currentLimit
    });

    return NextResponse.json(
      {
        message: "알림 메세지 조회에 성공했어요.",
        messages,
        nextKey
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      if (error.message === "잘못된 접근이에요.") {
        return NextResponse.json({ message: error.message }, { status: 403 });
      }
    }
    return NextResponse.json(
      {
        message: "알림 메세지 조회에 실패했어요.\n잠시 후 다시 시도해주세요."
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { endKey } = await req.json();

    if (!endKey) {
      return NextResponse.json(
        { message: "읽음 처리할 범위 키가 없어요." },
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

    const myUid = isValidAuth?.auth?.uid;

    if (!myUid) {
      return NextResponse.json(
        { message: "유저 ID가 존재하지 않아요." },
        { status: 400 }
      );
    }

    await readAllNotificationMessage({ userId: myUid, endKey });

    return NextResponse.json(
      { message: "알림 메세지 읽음 처리에 성공했어요." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      if (error.message === "잘못된 접근이에요.") {
        return NextResponse.json({ message: error.message }, { status: 403 });
      }
    }
    return NextResponse.json(
      {
        message:
          "알림 메세지 읽음 처리에 실패했어요.\n잠시 후 다시 시도해주세요."
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { endKey } = await req.json();

    if (!endKey) {
      return NextResponse.json(
        { message: "삭제 처리할 범위 키가 없어요." },
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

    const myUid = isValidAuth?.auth?.uid || "";

    await deleteAllNotificationMessage({ userId: myUid, endKey });

    return NextResponse.json(
      { message: "알림 메세지 삭제에 성공했어요." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      if (error.message === "잘못된 접근이에요.") {
        return NextResponse.json({ message: error.message }, { status: 403 });
      }
    }
    return NextResponse.json(
      {
        message: "알림 메세지 삭제에 실패했어요.\n잠시 후 다시 시도해주세요."
      },
      { status: 500 }
    );
  }
}
