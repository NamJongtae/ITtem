import crypto from "crypto";

const VERIFICATION_CODE_SALT = process.env.VERIFICATION_CODE_SALT ?? "dev-salt";

export function hashVerificationCode(code: string) {
  return crypto
    .createHash("sha256")
    .update(`${code}:${VERIFICATION_CODE_SALT}`)
    .digest("hex");
}
