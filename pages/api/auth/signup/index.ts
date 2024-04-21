import { getVerifiedEmail } from "@/lib/api/redis";
import { getHasdPassword } from "@/lib/api/auth";
import { DBClient } from "@/lib/database";
import { randomUUID } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";

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

      await db.collection("user").insertOne({
        uid: randomUUID(),
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
