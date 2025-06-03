import { generateToken } from "@/shared/common/utils/generateToken";
import { IronSessionType } from "../types/authTypes";
import {
  ACCESS_TOKEN_EXP,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_EXP,
  REFRESH_TOKEN_KEY
} from "../constants/constansts";
import saveTokenFromRedis from "./saveTokenFromRedis";

export default async function createAndSaveToken({
  user,
  session
}: {
  user: { uid: string };
  session: IronSessionType;
}) {
  const accessToken = await generateToken({
    payload: { user, exp: Math.floor(Date.now() / 1000) + ACCESS_TOKEN_EXP },
    secret: ACCESS_TOKEN_KEY
  });

  const refreshToken = await generateToken({
    payload: { user, exp: Math.floor(Date.now() / 1000) + REFRESH_TOKEN_EXP },
    secret: REFRESH_TOKEN_KEY as string
  });

  await saveTokenFromRedis({
    uid: user.uid,
    token: accessToken || "",
    type: "accessToken",
    exp: Math.floor(Date.now() / 1000) + ACCESS_TOKEN_EXP
  });
  await saveTokenFromRedis({
    uid: user.uid,
    token: refreshToken || "",
    type: "refreshToken",
    exp: Math.floor(Date.now() / 1000) + REFRESH_TOKEN_EXP
  });

  session.accessToken = accessToken || "";
  session.refreshToken = refreshToken || "";

  await session.save();
}
