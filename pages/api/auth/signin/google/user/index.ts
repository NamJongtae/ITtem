import { getGoogleAuthAccessToken, getGoogleAuthInfo } from "@/lib/api/auth";
import { NextApiRequest, NextApiResponse } from "next";

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
      res.status(200).json({
        message: "유저정보를 성공적으로 가져욌어요.",
        user: { ...googleUserData },
      });
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "유저정보를 가져오지못했어요." });
    }
  }
}
