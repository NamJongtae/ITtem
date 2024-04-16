import { ERROR_MESSAGE } from "@/constants/constant";
import { checkAuthorization } from "@/lib/server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const isValidAuth = await checkAuthorization(req, res);

      if (!isValidAuth.isValid) {
        res.status(401).json({
          message: isValidAuth.message,
        });
        return;
      }

      res.status(200).json({
        message: "유저정보를 성공적으로 불러왔어요.",
        user: isValidAuth.auth,
      });
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: ERROR_MESSAGE });
    }
  }
}
