import { getGoogleAuthAccessToken, getGoogleAuthInfo } from "@/lib/api/auth";
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
      return;
    }

    let googleAccessToken;

    try {
      const response = await getGoogleAuthAccessToken(code);
      googleAccessToken = response.data.access_token;
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "토큰을 가져오지못했어요." });
      return;
    }

    try {
      const response = await getGoogleAuthInfo(googleAccessToken);
      const googleUserData = response.data;

      await DBClient.connect();
      const db = DBClient.db("auth");
      const collection = db.collection("user");
      const dbUserData = (await collection.findOne({
        email: googleUserData.id,
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
        const email = googleUserData.email;
        const profileImg = googleUserData.picture;

        await db.collection("user").insertOne({
          email,
          nickname: userNickname,
          profileImg,
          socialType: SocialType.GOOGLE,
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
            profileImg,
          },
          session,
        });

        res.status(201).json({ message: "회원가입에 성공했어요.", user: {} });
        return;
      }

      if (dbUserData.socialType !== "GOOGLE") {
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
      console.log(error);
      res.status(500).json({ message: "로그인에 실패했어요." });
    } finally {
      DBClient.close();
    }
  }
}
