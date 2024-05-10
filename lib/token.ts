import { AuthData } from '@/types/authTypes';
import jwt, { JsonWebTokenError, JwtPayload, SignOptions } from "jsonwebtoken";
import { jwtVerify } from "jose";

export const generateToken = ({
  payload,
  options,
  secret,
}: {
  payload: JwtPayload;
  options?: SignOptions;
  secret: string;
}) => {
  const token = jwt.sign(payload, secret, options);
  return token;
};

export const verifyToken = (token: string, secret: string) => {
  try {
    const decoode = jwt.verify(token, secret);
    return {
      isVaild: true,
      message: "Valid Token.",
      data: decoode as { user: AuthData; lat: number; exp: number },
    };
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      return { isVaild: false, message: error.message };
    }
  }
};

export async function verifyTokenByJose(token: string, secret: string) {
  try {
    const { payload }: { payload: AuthData } = await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );
    return { isValid: true, data: payload };
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      return { isValid: false, message: error.message };
    }
  }
}