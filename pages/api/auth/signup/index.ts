import { getVerifiedEmail, saveToken } from "@/lib/api/redis";
import { getHasdPassword } from "@/lib/api/auth";
import { DBClient } from "@/lib/database";
import { v4 as uuid } from "uuid";
import { NextApiRequest, NextApiResponse } from "next";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants/constant';
import { generateToekn, setTokenExp } from '@/lib/token';
import { getIronSession } from 'iron-session';
import { IronSessionType } from '@/types/apiTypes';
import { sessionOptions } from '@/lib/server';

const ACCESS_TOKEN_EXP = setTokenExp(60);
const REFRESH_TOKEN_EXP = setTokenExp(300);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { email, password, nickname, profileImg, introduce } = req.body;
      await DBClient.connect();
      const db = DBClient.db("auth");

      if (!email) {
        res.status(422).json({ message: "이메일을 입력하지 않았어요." });
        return;
      }

      if (!password) {
        res.status(422).json({ message: "비밀번호를 입력하지 않았어요." });
        return;
      }

      if (!nickname) {
        res.status(422).json({ message: "닉네임을 입력하지 않았어요." });
        return;
      }

      try {
        const isVerifyedEmail = await getVerifiedEmail(email);
        if (!isVerifyedEmail) {
          res.status(401).json({ message: "인증되지 않은 이메일이에요." });
          return;
        }
      } catch (error) {
        res.status(401).json({ message: "인증되지 않은 이메일이에요." });
        return;
      }

      const hashedPassword = await getHasdPassword(password);
      const uid = uuid();
      await db.collection("user").insertOne({
        uid,
        socialType: null,
        email,
        password: hashedPassword,
        nickname,
        profileImg: profileImg?.imgUrl || "/icons/user_icon.svg",
        profieImgFilename: profileImg?.fileName || "",
        introduce,
        productList: [],
        wishList: [],
        followers: [],
        followings: [],
        chatRoomList: [],
      });

      const session = await getIronSession<IronSessionType>(
        req,
        res,
        sessionOptions
      );

      const accessToken = generateToekn({
        payload: {
          user: {
            uid,
            email,
            nickname,
            profileImg: profileImg?.imgUrl || "/icons/user_icon.svg",
          },
          exp: ACCESS_TOKEN_EXP,
        },
        secret: ACCESS_TOKEN_KEY,
      });

      const refreshToken = generateToekn({
        payload: {
          user: {
            uid,
            email,
            nickname,
            profileImg: profileImg?.imgUrl || "/icons/user_icon.svg",
          },
          exp: REFRESH_TOKEN_EXP,
        },
        secret: REFRESH_TOKEN_KEY as string,
      });

      await saveToken({
        uid,
        token: accessToken,
        type: "accessToken",
        exp: ACCESS_TOKEN_EXP,
      });

      await saveToken({
        uid,
        token: refreshToken,
        type: "refreshToken",
        exp: REFRESH_TOKEN_EXP,
      });

      session.accessToken = accessToken;
      session.refreshToken = refreshToken;

      await session.save();

      res.status(201).json({
        message: "회원가입에 성공했어요.",
        user: { nickname, profileImg: profileImg?.imgurl },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "회원가입에 실패했어요." });
    } finally {
      await DBClient.close();
    }
  }
}
