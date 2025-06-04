import deleteEmailVerificationCode from "../../../utils/deleteEmailVerificationCode";
import { client } from "@/shared/common/utils/redis";

jest.mock("@/shared/common/utils/redis");

describe("deleteEmailVerificationCode", () => {
  const mockRedis = {
    del: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (client as jest.Mock).mockResolvedValue(mockRedis);
  });

  const mockEmail = "test@example.com";

  it("타입이 'signup'일 때 인증 키를 삭제하고 결과를 반환합니다.", async () => {
    mockRedis.del.mockResolvedValue(1);

    const result = await deleteEmailVerificationCode(mockEmail, "signup");

    expect(client).toHaveBeenCalled();
    expect(mockRedis.del).toHaveBeenCalledWith(`${"signup"}:${mockEmail}`);
    expect(result).toBe(1);
  });

  it("타입이 'resetPw'일 때 인증 키를 삭제하고 결과를 반환합니다.", async () => {
    mockRedis.del.mockResolvedValue(1);

    const email = "test@example.com";
    const type = "resetPw";

    await deleteEmailVerificationCode(email, type);

    expect(mockRedis.del).toHaveBeenCalledWith(`${type}:${email}`);
  });

  it("에러가 발생하면 undefined를 반환하고 콘솔에 에러 로그를 출력합니다.", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    mockRedis.del.mockRejectedValue(new Error("Redis 인증 코드 삭제 오류"));

    const result = await deleteEmailVerificationCode(
      "test@example.com",
      "signup"
    );

    expect(result).toBeUndefined();
    expect(consoleSpy).toHaveBeenCalledWith(
      "Delete Email Verification Code Error:",
      expect.any(Error)
    );
    consoleSpy.mockRestore();
  });
});
