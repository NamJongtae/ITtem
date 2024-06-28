import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/server";
import { generateToken, verifyToken } from "@/lib/token";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken, saveToken } from "@/lib/api/redis";
import {
  ACCESS_TOKEN_EXP,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from "@/constants/constant";
import { IronSessionType } from "@/types/apiTypes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const session = await getIronSession<IronSessionType>(
        req,
        res,
        sessionOptions
      );

      const refreshToken = session.refreshToken;

      const decodeRefreshToken = await verifyToken(
        refreshToken,
        REFRESH_TOKEN_KEY as string
      );

      const redisRefreshToken = await getToken(
        decodeRefreshToken?.data?.user.uid || "",
        "refreshToken"
      );

      if (
        !redisRefreshToken ||
        redisRefreshToken !== refreshToken ||
        !decodeRefreshToken?.isValid
      ) {
        session.destroy();
        res.status(401).json({ message: "세션이 만료됬어요." });
        return;
      }

      const newAccessToken = await generateToken({
        payload: {
          user: decodeRefreshToken.data?.user,
          exp: Math.floor(Date.now() / 1000) + ACCESS_TOKEN_EXP,
        },
        secret: ACCESS_TOKEN_KEY,
      });

      await saveToken({
        uid: decodeRefreshToken.data?.user.uid || "",
        token: newAccessToken,
        type: "accessToken",
        exp: Math.floor(Date.now() / 1000) + ACCESS_TOKEN_EXP,
      });

      session.accessToken = newAccessToken;
      await session.save();

      res.status(200).json({
        message: "토큰이 발급 됬어요.",
        accessToken: newAccessToken,
      });
    } catch (error) {
      console.log(error);
      res.status(422).json({ message: "토큰 발급에 실패 했어요." });
    }
  }
}
