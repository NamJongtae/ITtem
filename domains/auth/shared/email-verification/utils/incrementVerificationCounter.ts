import { client } from "@/shared/common/utils/redis";
import { EmailVerificationType } from "../types/emailVerificationTypes";
import { VERIFICATION_EMAIL_BLOCK_EXP } from "../../common/constants/constansts";

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
