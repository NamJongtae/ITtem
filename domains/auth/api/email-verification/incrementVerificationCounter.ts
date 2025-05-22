import { client } from "@/utils/api/redis";
import { EmailVerificationType } from "../../types/auth-types";
import { VERIFICATION_EMAIL_BLOCK_EXP } from "../../constants/constansts";

export default async function incrementVerificationCounter(
  email: string,
  count: string | undefined,
  type: EmailVerificationType
) {
  try {
    if (!count) return;
    const redis = await client();
    const key = `${type}:${email}`;
    const newCount = parseInt(count, 10) + 1;
    await redis.hset(key, { count: newCount });
    if (newCount >= 9) {
      await redis.expire(key, VERIFICATION_EMAIL_BLOCK_EXP);
    }
  } catch (error) {
    console.error("increment tVerification Email Counter Error:", error);
  }
}
