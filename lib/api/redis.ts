import { Redis } from "@upstash/redis";

const client = new Redis({
  url: process.env.NEXT_SECRET_REDIS_URL as string,
  token: process.env.NEXT_SECRET_REDIS_TOKEN as string,
});

export const saveVerifiedEmail = async (email: string) => {
  try {
    await client.set(email, email, { ex: 60 * 30 });
  } catch (error) {
    console.error("이메일 인증에 실패하였습니다!");
  }
};

export const getVerifiedEmail = async (email: string) => {
  try {
    const isVerify = await client.get(email);
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

export const saveEmailVerifyNumber = async (
  email: string,
  number: number,
  count = 0,
  exp = 60 * 3 + 10
) => {
  try {
    await client.hset(email, { verifyCode: number, count });
    await client.expire(email, exp);
  } catch (error) {
    console.error(error);
  }
};

export const getEmailVerifyNumber = async (email: string) => {
  try {
    const result: { verifyCode: string; count: string } | null =
      await client.hgetall(email);
    return result;
  } catch (error) {
    console.error(error);
  }
};
