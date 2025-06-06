import { EmailVerificationType } from "../types/emailVerificationTypes";
import { VERIFICATION_EMAIL_EXP } from "../../common/constants/constansts";
import { client } from "@/shared/common/utils/redis";

export default async function saveEmailVerificationCode(
  email: string,
  verificationCode: string,
  type: EmailVerificationType,
  count = 1,
  exp = VERIFICATION_EMAIL_EXP
) {
  try {
    const redis = await client();
    const key = `${type}:${email}`;
    await redis.hset(key, { isVerification: false, verificationCode, count });
    await redis.expire(key, exp);
  } catch (error) {
    console.error("Save Email Verification Code Error:", error);
  }
}
