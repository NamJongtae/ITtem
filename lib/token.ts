import { AuthData } from "@/types/authTypes";
import { JwtPayload, SignOptions } from "jsonwebtoken";
export const generateToken = async ({
  payload,
  options,
  secret,
}: {
  payload: JwtPayload;
  options?: SignOptions;
  secret: string;
}) => {
  const jwt = await import("jsonwebtoken");
  const token = jwt.sign(payload, secret, options);
  return token;
};

export const verifyToken = async (token: string, secret: string) => {
  try {
    const jwt = await import("jsonwebtoken");
    const decode = jwt.verify(token, secret);
    return {
      isValid: true,
      message: "Valid Token.",
      data: decode as { user: { uid: string }; lat: number; exp: number },
    };
  } catch (error) {
    if (error instanceof (await import("jsonwebtoken")).JsonWebTokenError) {
      return { isValid: false, message: error.message };
    }
  }
};

export async function verifyTokenByJose(token: string, secret: string) {
  try {
    const { jwtVerify } = await import("jose");
    const { payload }: { payload: AuthData } = await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );
    return { isValid: true, data: payload };
  } catch (error) {
    if (error instanceof (await import("jsonwebtoken")).JsonWebTokenError) {
      return { isValid: false, message: error.message };
    }
  }
}
