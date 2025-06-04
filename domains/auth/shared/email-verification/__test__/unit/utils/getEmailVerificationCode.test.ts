import getEmailVerificationCode from "../../../utils/getEmailVerificationCode";
import { client } from "@/shared/common/utils/redis";

jest.mock("@/shared/common/utils/redis");

describe("getEmailVerificationCode", () => {
  const mockRedis = {
    hgetall: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (client as jest.Mock).mockResolvedValue(mockRedis);
  });

  const mockEmail = "test@example.com";

  it("타입이 'signup'일 때 인증코드 정보를 조회합니다.", async () => {
    const type = "signup";
    const mockData = {
      verificationCode: "ABC123",
      count: "2"
    };

    mockRedis.hgetall.mockResolvedValue(mockData);

    const result = await getEmailVerificationCode(mockEmail, type);

    expect(client).toHaveBeenCalled();
    expect(mockRedis.hgetall).toHaveBeenCalledWith(`${type}:${mockEmail}`);
    expect(result).toEqual(mockData);
  });

  it("타입이 'resetPw'일 때 인증코드 정보를 조회합니다.", async () => {
    const type = "resetPw";
    const mockData = {
      verificationCode: "ABC123",
      count: "2"
    };

    mockRedis.hgetall.mockResolvedValue(mockData);

    const result = await getEmailVerificationCode(mockEmail, type);

    expect(client).toHaveBeenCalled();
    expect(mockRedis.hgetall).toHaveBeenCalledWith(`${type}:${mockEmail}`);
    expect(result).toEqual(mockData);
  });

  it("에러가 발생할 경우 null을 반환하고 콘솔에 에러 로그를 출력합니다.", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    mockRedis.hgetall.mockRejectedValue(
      new Error("Redis 이메일 인증 코드 조회 에러")
    );

    const result = await getEmailVerificationCode("user@example.com", "signup");

    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(
      "Get Email Verification Code Error:",
      expect.any(Error)
    );
    consoleSpy.mockRestore();
  });
});
