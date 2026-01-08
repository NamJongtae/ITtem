import dbConnect from "@/shared/common/utils/db/db";
import Session from "@/domains/auth/shared/common/models/Sessions";
import User from "@/domains/auth/shared/common/models/User";
import { cookies } from "next/headers";

export default async function checkAuthorization() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("sessionId")?.value;

    if (!sessionId) {
      return {
        isValid: false,
        message: "로그인이 필요해요."
      };
    }

    await dbConnect();

    // 1️⃣ 세션 조회
    const session = await Session.findOne({
      sessionId,
      expiresAt: { $gt: new Date() }
    });

    if (!session) {
      return {
        isValid: false,
        message: "만료된 세션이에요."
      };
    }

    // 2️⃣ 유저 조회 (권한/정보 필요 시)
    const user = await User.findById(session.uid).select(
      "_id email nickname profileImg"
    );

    if (!user) {
      return {
        isValid: false,
        message: "유효하지 않은 사용자예요."
      };
    }

    return {
      isValid: true,
      auth: {
        uid: user._id.toString(),
        email: user.email,
        nickname: user.nickname,
        profileImg: user.profileImg
      },
      message: "유효한 세션이에요."
    };
  } catch (error) {
    console.error(error);
    return {
      isValid: false,
      message: "인증 확인 중 오류가 발생했어요."
    };
  }
}
