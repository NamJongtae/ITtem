import { JwtPayload, SignOptions } from "jsonwebtoken";

export async function generateToken({
  payload,
  options,
  secret
}: {
  payload: JwtPayload;
  options?: SignOptions;
  secret: string;
}) {
  try {
    const jwt = await import("jsonwebtoken");
    const token = jwt.sign(payload, secret, options);
    return token;
  } catch (error) {
    if (error instanceof Error) {
      console.error("토큰 생성 실패:", error.message);
      throw new Error("Failed to generate token");
    }
  }
}
