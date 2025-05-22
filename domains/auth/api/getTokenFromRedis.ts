import { client } from "@/utils/api/redis";

export default async function getTokenFromRedis(
  uid: string,
  type: "accessToken" | "refreshToken"
) {
  try {
    const redis = await client();
    const token = await redis.get(`${uid}:${type}`);
    return token;
  } catch (error) {
    console.error("getToken error:", error);
    return null;
  }
}
