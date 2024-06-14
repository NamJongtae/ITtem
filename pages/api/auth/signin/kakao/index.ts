import { getToken } from "@/lib/api/redis";
import mongoose from "mongoose";
import dbConnect from "@/lib/db";
import User from "@/lib/db/models/User";
import {
  createAndSaveToken,
  createUniqueNickname,
  sessionOptions,
} from "@/lib/server";
import { IronSessionType } from "@/types/apiTypes";
import { LoginType } from "@/types/authTypes";
import { getIronSession } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";

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

      await dbConnect();

      const dbUserData = await User.findOne({
        email: kakaoUserData.id.toString().email,
      });

      const session = await getIronSession<IronSessionType>(
        req,
        res,
        sessionOptions
      );

      if (!dbUserData) {
        // 회원가입 로직
        try {
          const userNickname = await createUniqueNickname(User);

          const email = kakaoUserData.id.toString();
          const profileImg = kakaoUserData.properties.profile_image;

          const userData = {
            email,
            nickname: userNickname,
            profileImg,
            loginType: LoginType.KAKAO,
            profileImgFilename: "",
          };

          const newUser = new User(userData);

          await newUser.save();

          await createAndSaveToken({
            user: {
              uid: newUser._id,
            },
            session,
          });
          res.status(201).json({
            message: "회원가입에 성공했어요.",
            user: {
              uid: newUser._id,
              email: newUser.email,
              nickname: newUser.nickname,
              profileImg: newUser.profileImg || "/icons/user_icon.svg",
            },
          });
          return;
        } catch (error) {
          console.log(error);
          if (error instanceof mongoose.Error.ValidationError) {
            const errorMessages = Object.values(error.errors).map(
              (err) => err.message
            );
            res.status(422).json({
              message: "유효하지 않은 값이 있어요.",
              error: errorMessages,
            });
            return;
          }
          res.status(500).json({ message: "회원가입에 실패했어요." });
          return;
        }
      }

      if (dbUserData.loginType !== "KAKAO") {
        res.status(401).json({ message: "이미 가입된 이메일입니다." });
        return;
      }

      // 로그인 로직
      const { _id: uid, email, nickname, profileImg } = dbUserData;

      const refreshTokenData = await getToken(uid, "refreshToken");

      if (refreshTokenData) {
        res.status(409).json({
          message:
            "제대로 로그아웃 하지 않았거나\n이미 로그인 중인 아이디입니다.",
        });
        return;
      }

      await createAndSaveToken({
        user: { uid },
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
      console.error(error);
      res
        .status(500)
        .json({ message: "로그인에 실패했어요.\n잠시 후 다시 시도해주세요." });
    }
  } else {
    res.status(405).json({ message: "잘못된 접근이에요." });
  }
}
