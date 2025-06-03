import { client } from "@/shared/common/utils/redis";

export default async function deleteTokenFromRedis(
  uid: string,
  type: "accessToken" | "refreshToken"
) {
  try {
    const redis = await client();
    const response = await redis.del(`${uid}:${type}`);
    return response;
  } catch (error) {
    console.error("deleteToken error:", error);
    throw error;
  }
}
