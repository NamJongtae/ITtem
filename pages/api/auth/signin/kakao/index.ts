import { getToken } from "@/lib/api/redis";
import { DBClient } from "@/lib/database";
import {
  createAndSaveToken,
  createUniqueNickname,
  sessionOptions,
} from "@/lib/server";
import { IronSessionType, SocialType, UserData } from "@/types/apiTypes";
import { getIronSession } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuid } from "uuid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { user } = req.body;
    if (!user) {
      res.status(422).json({ message: "유저정보가 없어요." });
    }

    try {
      const kakaoUserData = user;

      await DBClient.connect();
      const db = DBClient.db("ITtem");
      const collection = db.collection("user");
      const dbUserData = (await collection.findOne({
        email: kakaoUserData.id.toString(),
      })) as UserData | null;

      const session = await getIronSession<IronSessionType>(
        req,
        res,
        sessionOptions
      );

      if (!dbUserData) {
        // 회원가입 로직
        const userNickname = await createUniqueNickname(db);

        const uid = uuid();
        const email = kakaoUserData.id.toString();
        const profileImg = kakaoUserData.properties.profile_image;

        await db.collection("user").insertOne({
          email,
          nickname: userNickname,
          profileImg,
          socialType: SocialType.KAKAO,
          profileImgFilename: "",
          uid,
          introduce: "",
          productList: [],
          wishList: [],
          followers: [],
          followings: [],
          chatRoomList: [],
        });

        await createAndSaveToken({
          user: {
            uid,
            email,
            nickname: userNickname,
            profileImg: profileImg || "",
          },
          session,
        });
        res.status(201).json({ message: "회원가입에 성공했어요.", user: {} });
        return;
      }

      if (dbUserData.socialType !== "KAKAO") {
        res.status(401).json({ message: "이미 가입된 이메일입니다." });
        return;
      }

      // 로그인 로직
      const { uid, email, nickname, profileImg } = dbUserData;

      const refreshTokenData = await getToken(uid, "refreshToken");

      if (refreshTokenData) {
        res.status(409).json({
          message:
            "제대로 로그아웃 하지 않았거나\n이미 로그인 중인 아이디입니다.",
        });
        return;
      }

      await createAndSaveToken({
        user: dbUserData,
        session,
      });

      res.status(200).json({
        message: "로그인에 성공했어요.",
        user: {
          uid,
          email,
          nickname,
          profileImg,
        },
      });
    } catch (error) {
      res.status(401).json({ message: "유저 정보를 가져오지못했어요." });
    }
  }
}
