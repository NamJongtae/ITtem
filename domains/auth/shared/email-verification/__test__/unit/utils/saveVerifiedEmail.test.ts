import saveVerifiedEmail from "../../../utils/saveVerifiedEmail";
import { client } from "@/shared/common/utils/redis";
import { VERIFIED_EMAIL_EXP } from "@/domains/auth/shared/common/constants/constansts";

jest.mock("@/shared/common/utils/redis");

describe("saveVerifiedEmail", () => {
  const mockRedis = {
    hset: jest.fn(),
    expire: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (client as jest.Mock).mockResolvedValue(mockRedis);
  });

  const email = "test@example.com";

  it("type이 'signup'일 때 Redis에 isVerification: true를 저장하고 인증 완료 만료 시간을 설정합니다.", async () => {
    await saveVerifiedEmail(email, "signup");

    const expectedKey = "signup:test@example.com";

    expect(mockRedis.hset).toHaveBeenCalledWith(expectedKey, {
      isVerification: true
    });
    expect(mockRedis.expire).toHaveBeenCalledWith(
      expectedKey,
      VERIFIED_EMAIL_EXP
    );
  });

  it("type이 'resetPw'일 때 Redis에 isVerification: true를 저장하고 인증 완료 만료 시간을 설정합니다.", async () => {
    await saveVerifiedEmail(email, "resetPw");

    const expectedKey = "resetPw:test@example.com";

    expect(mockRedis.hset).toHaveBeenCalledWith(expectedKey, {
      isVerification: true
    });
    expect(mockRedis.expire).toHaveBeenCalledWith(
      expectedKey,
      VERIFIED_EMAIL_EXP
    );
  });

  it("에러가 발생하면 undefined를 반환하고 콘솔에 에러 로그를 출력합니다.", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    mockRedis.hset.mockRejectedValue(
      new Error("Redis 이메일 인증 확인 저장 오류 발생")
    );

    const result = await saveVerifiedEmail(email, "signup");

    expect(result).toBeUndefined();
    expect(consoleSpy).toHaveBeenCalledWith(
      "Save Verified Email Error:",
      expect.any(Error)
    );
  });
});
