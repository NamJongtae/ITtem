import getTokenFromRedis from "../../../utils/getTokenFromRedis";
import { client } from "@/shared/common/utils/redis";

jest.mock("@/shared/common/utils/redis");

describe("getTokenFromRedis 유틸 함수 테스트", () => {
  const mockUid = "user-456";
  const mockType = "refreshToken";
  const mockKey = `${mockUid}:${mockType}`;

  const mockRedis = {
    get: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (client as jest.Mock).mockResolvedValue(mockRedis);
  });

  it("Redis에서 uid:type 키로 토큰을 조회하고 반환합니다.", async () => {
    const expectedToken = "mock-refresh-token";
    mockRedis.get.mockResolvedValue(expectedToken);

    const result = await getTokenFromRedis(mockUid, mockType);

    expect(client).toHaveBeenCalled();
    expect(mockRedis.get).toHaveBeenCalledWith(mockKey);
    expect(result).toBe(expectedToken);
  });

  it("에러가 발생하면 null을 반환합니다.", async () => {
    mockRedis.get.mockRejectedValue(new Error("Redis Token 조회 실패"));

    const result = await getTokenFromRedis(mockUid, mockType);

    expect(client).toHaveBeenCalled();
    expect(result).toBeNull();
  });
});
