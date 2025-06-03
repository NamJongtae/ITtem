import { client } from "@/shared/common/utils/redis";
import { EmailVerificationType } from "../types/emailVerificationTypes";

export default async function getVerifiedEmail(
  email: string,
  type: EmailVerificationType
) {
  try {
    const redis = await client();
    const key = `${type}:${email}`;
    const isVerification = await redis.hget(key, "isVerification");

    return isVerification;
  } catch (error) {
    console.error("getVerifiedEmail error:", error);
    return false;
  }
}
