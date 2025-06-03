import { verifyToken } from "@/shared/common/utils/verifyToken";
import { verifyTokenByJose } from "@/shared/common/utils/verifyTokenByJose";
import getTokenFromRedis from "./getTokenFromRedis";
import { SESSION_OPTIONS } from "../constants/constansts";
import { IronSessionType } from "../types/authTypes";
import { cookies } from "next/headers";

export default async function checkAuthorization() {
  const { getIronSession } = await import("iron-session");
  const session = await getIronSession<IronSessionType>(
    await cookies(),
    SESSION_OPTIONS
  );

  const accessToken = session.accessToken;

  let decodeAccessToken;
  if (process.env.NEXT_RUNTIME === "edge") {
    decodeAccessToken = await verifyTokenByJose(
      accessToken as string,
      process.env.NEXT_SECRET_ACCESS_TOKEN_KEY as string
    );
  } else {
    decodeAccessToken = await verifyToken(
      accessToken as string,
      process.env.NEXT_SECRET_ACCESS_TOKEN_KEY as string
    );
  }

  if (!decodeAccessToken?.isValid) {
    return { isValid: false, message: "만료된 토큰이에요." };
  }

  const redisAccessToken = await getTokenFromRedis(
    decodeAccessToken?.data?.user.uid as string,
    "accessToken"
  );

  if (accessToken && accessToken !== redisAccessToken) {
    return { isValid: false, message: "만료된 토큰이에요." };
  } else {
    return {
      isValid: true,
      auth: decodeAccessToken.data?.user,
      message: "유효한 토큰이에요."
    };
  }
}
