import { ACCESS_TOKEN_KEY } from "@/constants/constant";
import { deleteToken } from "@/lib/api/redis";
import { sessionOptions } from "@/lib/server";
import { verifyToken } from "@/lib/token";
import { IronSessionType } from '@/types/apiTypes';
import { getIronSession } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const session = await getIronSession<IronSessionType>(req, res, sessionOptions);
      const accessToken = session.accessToken;
      const decodeAccessToken = verifyToken(accessToken, ACCESS_TOKEN_KEY);

      await deleteToken(decodeAccessToken?.data?.user.uid || "", "accessToken");
      await deleteToken(
        decodeAccessToken?.data?.user.uid || "",
        "refreshToken"
      );
      session.destroy();
      res.status(200).json({ message: "로그아웃에 성공했어요." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "로그아웃에 실패했어요." });
    }
  }
}
