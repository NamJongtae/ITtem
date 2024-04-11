import { getVerifiedEmail } from "@/lib/api/redis";
import { getHasdPassword } from "@/lib/api/signup";
import { DBClient } from "@/lib/database";
import { randomUUID } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email, password, nickname, profileImgData, introduce } = req.body;
    await DBClient.connect();
    const db = DBClient.db("auth");

    if (!email) {
      res.status(422).json({ message: "이메일을 입력하지 않았습니다!" });
      return;
    }

    if (!password) {
      res.status(422).json({ message: "비밀번호를 입력하지 않았습니다!" });
      return;
    }

    if (!nickname) {
      res.status(422).json({ message: "닉네임을 입력하지 않았습니다!" });
      return;
    }

    try {
      const isVerifyedEmail = await getVerifiedEmail(email);
      if (!isVerifyedEmail) {
        res.status(422).json({ message: "인증되지 않은 이메일입니다." });
        return;
      }
    } catch (error) {
      res.status(422).json({ message: "인증되지 않은 이메일입니다." });
      return;
    }

    const hashedPassword = await getHasdPassword(password);

    await db.collection("user").insertOne({
      uid: randomUUID(),
      email,
      password: hashedPassword,
      nickname,
      profileImg: profileImgData?.imgUrl || "/icons/user_icon.svg",
      filename: profileImgData?.fileName || "",
      introduce,
      productList: [],
      wishList: [],
      followers: [],
      followings: [],
      chatRoomList: [],
    });

    res.status(201).json({
      message: "회원가입에 성공하였습니다.",
      user: { nickname, profileImg: profileImgData?.imgurl },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "회원가입에 실패하였습니다." });
  } finally {
    await DBClient.close();
  }
}
