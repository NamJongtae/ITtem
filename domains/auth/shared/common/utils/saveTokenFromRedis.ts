import { client } from "@/shared/common/utils/redis";

export default async function saveTokenFromRedis({
  uid,
  token,
  type,
  exp
}: {
  uid: string;
  token: string;
  type: "accessToken" | "refreshToken";
  exp: number;
}) {
  try {
    const redis = await client();
    const ex = exp - Math.floor(Date.now() / 1000);
    await redis.set(`${uid}:${type}`, token, { ex });
  } catch (error) {
    console.error("saveToken error:", error);
    throw error;
  }
}
