import { ACCESS_TOKEN_KEY } from "@/constants/constant";
import { deleteToken } from "@/lib/api/redis";
import { DBClient } from "@/lib/database";
import { sessionOptions } from "@/lib/server";
import { verifyToken } from "@/lib/token";
import { IronSessionType, UserData } from "@/types/apiTypes";
import { getIronSession } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";

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
      const accessToken = session.accessToken;
      const decodeAccessToken = verifyToken(accessToken, ACCESS_TOKEN_KEY);

      await deleteToken(decodeAccessToken?.data?.user.uid || "", "accessToken");
      await deleteToken(
        decodeAccessToken?.data?.user.uid || "",
        "refreshToken"
      );
      session.destroy();

      await DBClient.connect();
      const db = DBClient.db("ITtem");
      const user = (await db.collection("user").findOne({
        uid: decodeAccessToken?.data?.user.uid || "",
      })) as UserData | null;

      if (user?.socialType === "KAKAO") {
        res
          .status(202)
          .json({ message: "카카오 계정은 별도의 로그아웃이 필요해요."});
        return;
      }

      res.status(200).json({ message: "로그아웃에 성공했어요." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "로그아웃에 실패했어요." });
    } finally {
      DBClient.close();
    }
  }
}
