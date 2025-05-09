import {
  VERIFIED_EMAIL_EXP,
  VERIFICATION_EMAIL_BLOCK_EXP,
  VERIFICATION_EMAIL_EXP
} from "@/constants/constant";
import { VerificationEmailType } from "@/types/auth-types";
import { Redis } from "@upstash/redis";

let redis: Redis;

const initializeRedisClient = async () => {
  if (!redis) {
    const { Redis } = await import("@upstash/redis");

    const redisUrl = process.env.NEXT_SECRET_REDIS_URL;
    const redisToken = process.env.NEXT_SECRET_REDIS_TOKEN;

    if (!redisUrl || !redisToken) {
      throw new Error("Environment variables for Redis are not set");
    }

    redis = new Redis({
      url: redisUrl,
      token: redisToken
    });
  }
};

// 모든 함수 호출 전에 Redis 클라이언트를 초기화합니다.
const client = async () => {
  await initializeRedisClient();
  return redis;
};

export const saveVerifiedEmail = async (
  email: string,
  type: VerificationEmailType
) => {
  try {
    const redis = await client();
    const key = `${type}:${email}`;
    await redis.hset(key, { isVerification: true });
    await redis.expire(key, VERIFIED_EMAIL_EXP);
  } catch (error) {
    console.error("saveVerifiedEmail error:", error);
  }
};

export const getVerifiedEmail = async (
  email: string,
  type: VerificationEmailType
) => {
  try {
    const redis = await client();
    const key = `${type}:${email}`;
    const isVerification = await redis.hget(key, "isVerification");

    return isVerification;
  } catch (error) {
    console.error("getVerifiedEmail error:", error);
    return false;
  }
};

export const incrementVerificationEmailCounter = async (
  email: string,
  count: string | undefined,
  type: VerificationEmailType
) => {
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
};

export const saveEmailVerificationCode = async (
  email: string,
  verificationCode: string,
  type: VerificationEmailType,
  count = 1,
  exp = VERIFICATION_EMAIL_EXP
) => {
  try {
    const redis = await client();
    const key = `${type}:${email}`;
    await redis.hset(key, { isVerification: false, verificationCode, count });
    await redis.expire(key, exp);
  } catch (error) {
    console.error("Save Email Verification Code Error:", error);
  }
};

export const getEmailVerificationCode = async (
  email: string,
  type: "signup" | "resetPw"
) => {
  try {
    const redis = await client();
    const key = `${type}:${email}`;
    const result: { verificationCode: string; count: string } | null =
      await redis.hgetall(key);
    return result;
  } catch (error) {
    console.error("Get Email Verification Code Error:", error);
    return null;
  }
};

export const deleteEmailVerificationCode = async (
  email: string,
  type: VerificationEmailType
) => {
  try {
    const redis = await client();
    const key =  `${type}:${email}`;
    const result = await redis.del(key);
    return result;
  } catch (error) {
    console.error("Delete Email Verification Code Error:", error);
  }
};

export async function saveToken({
  uid,
  token,
  type,
  exp
}: {
  uid: string;
  token: string;
  type: "accessToken" | "refreshToken";
  exp: number;
}) {
  try {
    const redis = await client();
    const ex = exp - Math.floor(Date.now() / 1000);
    await redis.set(`${uid}:${type}`, token, { ex });
  } catch (error) {
    console.error("saveToken error:", error);
  }
}

export async function getToken(
  uid: string,
  type: "accessToken" | "refreshToken"
) {
  try {
    const redis = await client();
    const token = await redis.get(`${uid}:${type}`);
    return token;
  } catch (error) {
    console.error("getToken error:", error);
    return null;
  }
}

export async function deleteToken(
  uid: string,
  type: "accessToken" | "refreshToken"
) {
  try {
    const redis = await client();
    const response = await redis.del(`${uid}:${type}`);
    return response;
  } catch (error) {
    console.error("deleteToken error:", error);
  }
}
