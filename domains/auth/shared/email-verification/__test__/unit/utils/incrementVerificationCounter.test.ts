import incrementVerificationCounter from "../../../utils/incrementVerificationCounter";
import { client } from "@/shared/common/utils/redis";
import { VERIFICATION_EMAIL_BLOCK_EXP } from "@/domains/auth/shared/common/constants/constansts";
jest.mock("@/shared/common/utils/redis");

describe("incrementVerificationCounter", () => {
  const mockRedis = {
    hset: jest.fn(),
    expire: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (client as jest.Mock).mockResolvedValue(mockRedis);
  });

  const email = "test@example.com";

  it("type이 signup인 경우 hset를 호출하여 인증 카운터를 증가시킵니다.", async () => {
    await incrementVerificationCounter(email, "3", "signup");

    expect(mockRedis.hset).toHaveBeenCalledWith("signup:test@example.com", {
      count: 4
    });
    expect(mockRedis.expire).not.toHaveBeenCalled();
  });

  it("count가 9 이상이면 expire를 호출하여 BLOCK_EXP를 설정합니다.", async () => {
    await incrementVerificationCounter(email, "9", "signup");

    expect(mockRedis.hset).toHaveBeenCalledWith("signup:test@example.com", {
      count: 10
    });
    expect(mockRedis.expire).toHaveBeenCalledWith(
      "signup:test@example.com",
      VERIFICATION_EMAIL_BLOCK_EXP
    );
  });

  it("type이 resetPw인 경우 hset를 호출하여 인증 카운터를 증가시킵니다.", async () => {
    await incrementVerificationCounter(email, "5", "resetPw");

    expect(mockRedis.hset).toHaveBeenCalledWith("resetPw:test@example.com", {
      count: 6
    });
  });

  it("count가 undefined면 Redis를 호출하지 않습니다.", async () => {
    await incrementVerificationCounter(email, undefined, "signup");

    expect(mockRedis.hset).not.toHaveBeenCalled();
    expect(mockRedis.expire).not.toHaveBeenCalled();
  });

  it("에러가 발생하면 undefined를 반환하고 콘솔에 에러 로그를 출력합니다.", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    mockRedis.hset.mockRejectedValue(
      new Error("Redis 인증 카운터 증가 오류 발생")
    );

    const result = await incrementVerificationCounter(email, "1", "signup");

    expect(result).toBeUndefined();
    expect(consoleSpy).toHaveBeenCalledWith(
      "increment Verification Email Counter Error:",
      expect.any(Error)
    );
    consoleSpy.mockRestore();
  });
});
