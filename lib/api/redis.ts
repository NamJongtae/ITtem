import {
  VERIFIED_EMAIL_EXP,
  VERIFY_EMAIL_BLOCK_EXP,
  VERIFY_EMAIL_EXP,
} from "@/constants/constant";
import { Redis } from "@upstash/redis";

const client = new Redis({
  url: process.env.NEXT_SECRET_REDIS_URL as string,
  token: process.env.NEXT_SECRET_REDIS_TOKEN as string,
});

export const saveVerifiedEmail = async (email: string) => {
  try {
    await client.hset(email, { isVerify: true });
    await client.expire(email, VERIFIED_EMAIL_EXP);
  } catch (error) {
    console.error(error);
  }
};

export const getVerifiedEmail = async (email: string) => {
  try {
    const isVerify = await client.hget(email, "isVerify");
    if (isVerify) {
      return true;
    } else {
      return false;
    }
  } catch (error: any) {
    console.error(error);
    return false;
  }
};

export const incrementVerifyEmailCounter = async (
  email: string,
  count: string | undefined
) => {
  try {
    if (!count) return;
    await client.hset(email, { count: parseInt(count, 10) + 1 });
    if (parseInt(count, 10) >= 9) {
      await client.expire(email, VERIFY_EMAIL_BLOCK_EXP);
    }
  } catch (error) {
    console.log(error);
  }
};

export const saveEmailVerifyCode = async (
  email: string,
  verifyCode: string,
  count = 1,
  exp = VERIFY_EMAIL_EXP
) => {
  try {
    await client.hset(email, { isVerify: false, verifyCode, count });
    await client.expire(email, exp);
  } catch (error) {
    console.error(error);
  }
};

export const getEmailVerifyCode = async (email: string) => {
  try {
    const result: { verifyCode: string; count: string } | null =
      await client.hgetall(email);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export async function saveToken({
  uid,
  token,
  type,
  exp,
}: {
  uid: string;
  token: string;
  type: "accessToken" | "refreshToken";
  exp: number;
}) {
  try {
    const ex = exp - Math.floor(Date.now() / 1000);
    await client.set(`${uid}:${type}`, token, { ex });
  } catch (error) {
    console.error(error);
  }
}

export async function getToken(uid: string, type: "accessToken" | "refreshToken") {
  try {
    const token = await client.get(`${uid}:${type}`);
    return token;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteToken(uid: string, type: "accessToken" | "refreshToken") {
  try {
    const response = await client.del(`${uid}:${type}`);
    return response;
  } catch (error) {
    console.error(error);
  }
}

