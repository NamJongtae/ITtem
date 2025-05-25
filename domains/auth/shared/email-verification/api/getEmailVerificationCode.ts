import { client } from "@/shared/common/utils/api/redis";

export default async function getEmailVerificationCode(
  email: string,
  type: "signup" | "resetPw"
) {
  try {
    const redis = await client();
    const key = `${type}:${email}`;
    const result: { verificationCode: string; count: string } | null =
      await redis.hgetall(key);
    return result;
  } catch (error) {
    console.error("Get Email Verification Code Error:", error);
    return null;
  }
}
