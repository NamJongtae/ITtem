import { client } from "@/utils/api/redis";
import { EmailVerificationType } from "../../types/auth-types";

export default async function deleteEmailVerificationCode(
  email: string,
  type: EmailVerificationType
) {
  try {
    const redis = await client();
    const key = `${type}:${email}`;
    const result = await redis.del(key);
    return result;
  } catch (error) {
    console.error("Delete Email Verification Code Error:", error);
  }
}
