import saveEmailVerificationCode from "../../../utils/saveEmailVerificationCode";
import { client } from "@/shared/common/utils/redis";
import { VERIFICATION_EMAIL_EXP } from "@/domains/auth/shared/common/constants/constansts";

jest.mock("@/shared/common/utils/redis");

describe("saveEmailVerificationCode", () => {
  const mockRedis = {
    hset: jest.fn(),
    expire: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (client as jest.Mock).mockResolvedValue(mockRedis);
  });

  const email = "test@example.com";
  const verificationCode = "123456";

  it("type이 'signup'인 경우 Redis에 인증코드와 count를 저장하고 인증 시간을 설정합니다.", async () => {
    await saveEmailVerificationCode(email, verificationCode, "signup");

    const expectedKey = "signup:test@example.com";

    expect(mockRedis.hset).toHaveBeenCalledWith(expectedKey, {
      isVerification: false,
      verificationCode,
      count: 1
    });
    expect(mockRedis.expire).toHaveBeenCalledWith(
      expectedKey,
      VERIFICATION_EMAIL_EXP
    );
  });

  it("type이 'resetPw'인 경우 Redis에 인증코드와 count를 저장하고 인증 시간을 설정합니다.", async () => {
    await saveEmailVerificationCode(email, verificationCode, "resetPw", 2, 999);

    const expectedKey = "resetPw:test@example.com";

    expect(mockRedis.hset).toHaveBeenCalledWith(expectedKey, {
      isVerification: false,
      verificationCode,
      count: 2
    });
    expect(mockRedis.expire).toHaveBeenCalledWith(expectedKey, 999);
  });

  it("에러가 발생하면 undefined를 반환하고 콘솔에 에러 로그를 출력합니다.", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    mockRedis.hset.mockRejectedValue(
      new Error("Redis 인증 코드 저장 에러 발생")
    );

    const result = await saveEmailVerificationCode(
      email,
      verificationCode,
      "signup"
    );

    expect(result).toBeUndefined();
    expect(consoleSpy).toHaveBeenCalledWith(
      "Save Email Verification Code Error:",
      expect.any(Error)
    );
  });
});
