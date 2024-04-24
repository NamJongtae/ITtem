import { ERROR_MESSAGE } from "@/constants/constant";
import { verifyPassword } from "@/lib/api/auth";
import { getToken } from "@/lib/api/redis";
import { DBClient } from "@/lib/database";
import { createAndSaveToken, sessionOptions } from "@/lib/server";
import { IronSessionType, UserData } from "@/types/apiTypes";
import { getIronSession } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";

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

      await DBClient.connect();
      const db = DBClient.db("auth");
      const collection = db.collection("user");
      const userData = (await collection.findOne({
        email: email.toLocaleLowerCase(),
      })) as UserData | null;

      // 소셜 로그인으로 가입한 경우
      if (userData?.socialType === "EMAIL") {
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

      const refreshTokenData = await getToken(userData.uid, "refreshToken");

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

      await createAndSaveToken({ user: userData, session });

      res.status(200).json({
        message: "로그인에 성공했습니다.",
        user: {
          uid: userData.uid,
          email: userData.email,
          nickname: userData.nickname,
          profileImg: userData.profileImg,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json(ERROR_MESSAGE);
    } finally {
      await DBClient.close();
    }
  }
}
