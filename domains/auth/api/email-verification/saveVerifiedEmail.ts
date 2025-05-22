import { client } from "@/utils/api/redis";
import { EmailVerificationType } from "../../types/auth-types";
import { VERIFIED_EMAIL_EXP } from "../../constants/constansts";

export default async function saveVerifiedEmail(
  email: string,
  type: EmailVerificationType
) {
  try {
    const redis = await client();
    const key = `${type}:${email}`;
    await redis.hset(key, { isVerification: true });
    await redis.expire(key, VERIFIED_EMAIL_EXP);
  } catch (error) {
    console.error("saveVerifiedEmail error:", error);
  }
}
