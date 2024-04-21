import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/constants/constant";
import { getGoogleAuthInfo } from "@/lib/api/auth";
import { saveToken } from "@/lib/api/redis";
import { DBClient } from "@/lib/database";
import { sessionOptions } from "@/lib/server";
import { generateToekn, setTokenExp } from "@/lib/token";
import { IronSessionType, UserData } from "@/types/apiTypes";
import { getIronSession } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuid } from "uuid";

const ACCESS_TOKEN_EXP = setTokenExp(60);
const REFRESH_TOKEN_EXP = setTokenExp(300);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { accessToken, socialType } = req.body;

    if (!accessToken) {
      res.status(401).json({ message: "토큰이 존재않아요." });
      return;
    }

    let userData;

    if (socialType === "GOOGLE") {
      userData = await getGoogleAuthInfo(accessToken);
    }

    if (!userData) {
      res.status(401).json({ message: "유저 정보를 불러오지못했어요." });
      return;
    }

    const email = userData?.data.email;
    const nickname = userData?.data.name;
    const profileImg = userData?.data.picture;

    await DBClient.connect();

    const db = DBClient.db("auth");
    const checkEmail = (await db
      .collection("user")
      .findOne({ email: userData?.data.email })) as UserData | null;

    if (checkEmail) {
      if (socialType === checkEmail.socialType) {
        // 로그인 처리
        const session = await getIronSession<IronSessionType>(
          req,
          res,
          sessionOptions
        );

        const accessToken = generateToekn({
          payload: {
            user: {
              uid: checkEmail.uid,
              email: checkEmail.email,
              nickname: checkEmail.nickname,
              profileImg: checkEmail.profileImg,
            },
            exp: ACCESS_TOKEN_EXP,
          },
          secret: ACCESS_TOKEN_KEY,
        });

        const refreshToken = generateToekn({
          payload: {
            user: {
              uid: checkEmail.uid,
              email: checkEmail.email,
              nickname: checkEmail.nickname,
              profileImg: checkEmail.profileImg,
            },
            exp: REFRESH_TOKEN_EXP,
          },
          secret: REFRESH_TOKEN_KEY as string,
        });

        await saveToken({
          uid: checkEmail.uid,
          token: accessToken,
          type: "accessToken",
          exp: ACCESS_TOKEN_EXP,
        });

        await saveToken({
          uid: checkEmail.uid,
          token: refreshToken,
          type: "refreshToken",
          exp: REFRESH_TOKEN_EXP,
        });

        session.accessToken = accessToken;
        session.refreshToken = refreshToken;

        await session.save();
        res.status(200).json({
          message: "로그인에 성공했어요.",
          user: {
            uid: checkEmail.uid,
            email: checkEmail.email,
            nickname: checkEmail.nickname,
            profileImg: checkEmail.profileImg,
          },
        });
      } else if (socialType !== checkEmail.socialType) {
        res.status(401).json({
          message: "이미 가입된 이메일입니다.",
        });
      }
    } else {
      // 회원가입 로직

      // 닉네임 중복체크
      let userNickname = nickname;
      let isDuplicationNickname = true;
      while (isDuplicationNickname) {
        const nicknameCheckResult = await db
          .collection("user")
          .findOne({ nickname: userNickname });
        if (nicknameCheckResult) {
          // 닉네임이 중복될 경우, 랜덤 숫자를 추가하여 새로운 닉네임 생성
          const randomString = uuid().substring(0, 8);
          userNickname = randomString;
        } else {
          // 닉네임이 중복되지 않으면 루프 종료
          isDuplicationNickname = false;
        }
      }

      const uid = uuid();
      await db.collection("user").insertOne({
        email,
        nickname: userNickname,
        profileImg,
        socialType,
        profileImgFilename: "",
        uid,
        introduce: "",
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
            nickname: userNickname,
            profileImg,
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
            profileImg,
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
        user: { uid, email, nickname, profileImg },
      });
    }
  }
}
