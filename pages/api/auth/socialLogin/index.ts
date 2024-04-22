import { getGoogleAuthInfo, getKaKaoAuthInfo } from "@/lib/api/auth";
import { DBClient } from "@/lib/database";
import {
  createAndSaveToken,
  createUniqueNickname,
  sessionOptions,
} from "@/lib/server";
import {
  IronSessionType,
  UserData,
} from "@/types/apiTypes";
import { getIronSession } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuid } from "uuid";

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

    let email;
    let profileImg;

    if (socialType === "GOOGLE") {
      const response = await getGoogleAuthInfo(accessToken);
      email = response.data.email;
      profileImg = response.data.picture;
    }

    if (socialType === "KAKAO") {
      const response = await getKaKaoAuthInfo(accessToken);
      email = response.data.id;
      profileImg = response.data.properties.profile_image;
    }

    if (!email) {
      res.status(401).json({ message: "유저 정보를 불러오지못했어요." });
      return;
    }

    await DBClient.connect();

    const db = DBClient.db("auth");
    const checkEmail = (await db
      .collection("user")
      .findOne({ email: email })) as UserData | null;

    if (checkEmail) {
      if (socialType === checkEmail.socialType) {
        // 로그인 처리
        const session = await getIronSession<IronSessionType>(
          req,
          res,
          sessionOptions
        );

        await createAndSaveToken({ user: checkEmail, session });

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
      const userNickname = await createUniqueNickname(db);

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

      await createAndSaveToken({
        user: {
          uid,
          email: email.toString(),
          nickname: userNickname,
          profileImg: profileImg || "",
        },
        session,
      });

      res.status(201).json({
        message: "회원가입에 성공했어요.",
        user: { uid, email, userNickname, profileImg },
      });
    }
  }
}
