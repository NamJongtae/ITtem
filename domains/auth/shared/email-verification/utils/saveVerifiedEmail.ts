import { client } from "@/shared/common/utils/redis";
import { EmailVerificationType } from "../types/emailVerificationTypes";
import { VERIFIED_EMAIL_EXP } from "../../common/constants/constansts";

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
    console.error("Save Verified Email Error:", error);
  }
}
