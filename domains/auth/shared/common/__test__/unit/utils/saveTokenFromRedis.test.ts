import saveTokenFromRedis from "../../../utils/saveTokenFromRedis";
import { client } from "@/shared/common/utils/redis";

jest.mock("@/shared/common/utils/redis");

describe("saveTokenFromRedis 유틸 함수 테스트", () => {
  const mockRedis = {
    set: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (client as jest.Mock).mockResolvedValue(mockRedis);
  });

  it("Redis에 토큰을 uid:type 키로 저장하고 만료 시간을 설정합니다.", async () => {
    const nowInSec = Math.floor(Date.now() / 1000);
    const input = {
      uid: "user-123",
      token: "token",
      type: "refreshToken" as "refreshToken",
      exp: 1234567890
    };

    await saveTokenFromRedis(input);

    const expectedEx = input.exp - nowInSec;

    expect(client).toHaveBeenCalled();
    expect(mockRedis.set).toHaveBeenCalledWith(
      "user-123:refreshToken",
      "token",
      { ex: expectedEx }
    );
  });

  it("에러가 발생하면 예외를 던집니다.", async () => {
    mockRedis.set.mockRejectedValue(new Error("Redis 토큰 저장에 실패했어요."));

    await expect(
      saveTokenFromRedis({
        uid: "user-123",
        token: "token",
        type: "refreshToken",
        exp: Math.floor(Date.now() / 1000) + 1000
      })
    ).rejects.toThrow("Redis 토큰 저장에 실패했어요.");
  });
});
