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
export const client = async () => {
  await initializeRedisClient();
  return redis;
};
