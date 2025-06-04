import getVerifiedEmail from "../../../utils/getVerifiedEmail";
import { client } from "@/shared/common/utils/redis";

jest.mock("@/shared/common/utils/redis");

describe("getVerifiedEmail", () => {
  const mockRedis = {
    hget: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (client as jest.Mock).mockResolvedValue(mockRedis);
  });

  it("type이 'signup'인 경우 isVerification 값을 조회합니다.", async () => {
    mockRedis.hget.mockResolvedValue("true");

    const result = await getVerifiedEmail("signup@example.com", "signup");

    expect(mockRedis.hget).toHaveBeenCalledWith(
      "signup:signup@example.com",
      "isVerification"
    );
    expect(result).toBe("true");
  });

  it("type이 'resetPw'인 경우 isVerification 값을 조회합니다.", async () => {
    mockRedis.hget.mockResolvedValue("true");

    const result = await getVerifiedEmail("reset@example.com", "resetPw");

    expect(mockRedis.hget).toHaveBeenCalledWith(
      "resetPw:reset@example.com",
      "isVerification"
    );
    expect(result).toBe("true");
  });

  it("에러가 발생할 경우 false를 반환하고 콘솔에 로그를 출력합니다.", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    mockRedis.hget.mockRejectedValue(new Error("Redis 인증 메일 조회 오류"));

    const result = await getVerifiedEmail("user@example.com", "signup");

    expect(result).toBe(false);
    expect(consoleSpy).toHaveBeenCalledWith(
      "Get Verified Email Error:",
      expect.any(Error)
    );
    consoleSpy.mockRestore();
  });
});
