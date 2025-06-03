import deleteTokenFromRedis from "../../../utils/deleteTokenFromRedis";
import { client } from "@/shared/common/utils/redis";

jest.mock("@/shared/common/utils/redis");

describe("deleteTokenFromRedis 유틸 함수 테스트", () => {
  const mockUid = "user-123";

  const mockRedis = {
    del: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (client as jest.Mock).mockResolvedValue(mockRedis);
  });

  it("Redis에서 해당 토큰 키를 삭제하고 결과를 반환합니다.", async () => {
    mockRedis.del.mockResolvedValue(1); // 삭제 성공 시 1 반환

    const result = await deleteTokenFromRedis(mockUid, "refreshToken");

    expect(client).toHaveBeenCalled();
    expect(mockRedis.del).toHaveBeenCalledWith("user-123:refreshToken");
    expect(result).toBe(1);
  });

  it("에러가 발생하면 예외를 던집니다.", async () => {
    mockRedis.del.mockRejectedValue(new Error("Redis 연결에 실패했어요."));

    await expect(deleteTokenFromRedis(mockUid, "accessToken")).rejects.toThrow(
      "Redis 연결에 실패했어요."
    );
    expect(client).toHaveBeenCalled();
  });
});
