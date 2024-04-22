import { getKaKaoAuthInfo, getKakaoAuthAccessToken } from "@/lib/api/auth";
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
    const { code } = req.body;
    if (!code) {
      res.status(422).json({ message: "유저 코드가 없어요." });
    }

    let kakaoAccessToken;

    try {
      const response = await getKakaoAuthAccessToken(code);
      kakaoAccessToken = response.data.access_token;
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "토큰을 가져오지못했어요." });
      return;
    }

    try {
      const response = await getKaKaoAuthInfo(kakaoAccessToken);
      const kakaoUserData = response.data;

      await DBClient.connect();
      const db = DBClient.db("auth");
      const collection = db.collection("user");
      const dbUserData = (await collection.findOne({
        email: kakaoUserData.id,
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
        const email = kakaoUserData.id;
        const profileImg = kakaoUserData.properties.profile_image;

        await db.collection("user").insertOne({
          email,
          nickname: userNickname,
          profileImg,
          socialType: SocialType.KAKAO ,
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
            email: email.toString(),
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
