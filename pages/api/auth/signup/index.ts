import { deleteEmailVerifyCode, getVerifiedEmail } from "@/lib/api/redis";
import { getHasdPassword } from "@/lib/api/auth";
import dbConnect from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getIronSession } from "iron-session";
import { IronSessionType } from "@/types/apiTypes";
import { createAndSaveToken, sessionOptions } from "@/lib/server";
import User from "@/lib/db/models/User";
import { LoginType } from "@/types/authTypes";
import mongoose from "mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { email, password, nickname, profileImgData, introduce } = req.body;

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

      await dbConnect();

      const userData = {
        loginType: LoginType.EMAIL,
        email: email.toLowerCase(),
        password: hashedPassword,
        nickname,
        profileImg: profileImgData.url,
        profieImgFilename: profileImgData.name,
        introduce,
      };

      const newUser = new User(userData);

      await newUser.save();

      const session = await getIronSession<IronSessionType>(
        req,
        res,
        sessionOptions
      );

      await createAndSaveToken({
        user: {
          uid: newUser._id,
          email: newUser.email,
          nickname: newUser.nickname,
          profileImg: newUser.profileImg,
        },
        session,
      });

      await deleteEmailVerifyCode(email);

      res.status(201).json({
        message: "회원가입에 성공했어요.",
        user: { nickname, profileImg: profileImgData.url },
      });
    } catch (error) {
      console.error(error);
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
      res.status(500).json({
        message: "회원가입에 실패했어요.\n잠시 후 다시 시도해주세요.",
      });
    }
  }
}
