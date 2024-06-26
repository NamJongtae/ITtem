import { verifyPassword } from "@/lib/api/auth";
import { getToken } from "@/lib/api/redis";
import User from "@/lib/db/models/User";
import { createAndSaveToken, sessionOptions } from "@/lib/server";
import { IronSessionType } from "@/types/apiTypes";
import { getIronSession } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const {
        email,
        password,
        isDuplicateLogin,
      }: { email: string; password: string; isDuplicateLogin: boolean } =
        req.body;

      if (!email || !password) {
        res.status(422).json({ message: "유효하지 않은 값이 있어요." });
      }

      await dbConnect();

      const userData = await User.findOne({ email: email.toLowerCase() });

      // 소셜 로그인으로 가입한 경우
      if (userData?.loginType !== "EMAIL") {
        res
          .status(401)
          .json({ message: "이메일 혹은 비밀번호가 일치하지 않아요." });
        return;
      }

      if (!userData) {
        res
          .status(401)
          .json({ message: "이메일 혹은 비밀번호가 일치하지 않아요." });
        return;
      }

      const isVerifyPassword = await verifyPassword(
        password,
        userData.password
      );

      if (!isVerifyPassword) {
        res
          .status(401)
          .json({ message: "이메일 혹은 비밀번호가 일치하지 않아요." });
        return;
      }

      const refreshTokenData = await getToken(userData._id, "refreshToken");

      if (refreshTokenData && !isDuplicateLogin) {
        res.status(409).json({
          message:
            "제대로 로그아웃 하지 않았거나\n이미 로그인 중인 아이디입니다.",
        });
        return;
      }

      const session = await getIronSession<IronSessionType>(
        req,
        res,
        sessionOptions
      );

      await createAndSaveToken({
        user: {
          uid: userData._id,
        },
        session,
      });

      res.status(200).json({
        message: "로그인에 성공했습니다.",
        user: {
          uid: userData._id,
          email: userData.email,
          nickname: userData.nickname,
          profileImg: userData.profileImg,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "로그인에 실패했어요.\n잠시 후 다시 시도해주세요.",
      });
    }
  } else {
    res.status(405).json({ message: "잘못된 접근이에요." });
  }
}
