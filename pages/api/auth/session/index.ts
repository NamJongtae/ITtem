import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const session = req.cookies["session"];
    if (session) {
      res.status(200).json({message:"세션 쿠기가 존재해요.", ok: true });
    } else {
      res.status(200).json({message:"세션 쿠기가 존재하지 않아요.", ok: false });
    }
  } else {
    res.status(405).json({ message: "잘못된 접근이에요." });
  }
}
