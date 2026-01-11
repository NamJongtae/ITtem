import getFollowers from "../../../api/getFollowers";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import { FollowersResponseData } from "../../../types/responseTypes";

jest.mock("@/shared/common/utils/customAxios", () => ({
  __esModule: true,
  default: jest.fn()
}));

describe("getFollowers", () => {
  const mockUid = "user-1";

  const mockResponse: AxiosResponse<FollowersResponseData> = {
    data: {
      message: "팔로워 목록 조회에 성공했어요.",
      followers: [
        {
          uid: "user-100",
          nickname: "user100",
          profileImg: "http://storage.com/test1_profile.png",
          productIds: ["product-123"],
          reviewPercentage: 90,
          isFollow: false,
          followersCount: 3,
          followingsCount: 7,
          createdAt: "2026-01-01T00:00:00.000Z"
        },
        {
          uid: "user-200",
          nickname: "user200",
          profileImg: "http://storage.com/test2_profile.png",
          productIds: ["product-234"],
          reviewPercentage: 80,
          isFollow: true,
          followersCount: 10,
          followingsCount: 2,
          createdAt: "2026-01-02T00:00:00.000Z"
        }
      ]
    } as any,
    status: 200,
    statusText: "ok",
    headers: {},
    config: {
      headers: new AxiosHeaders()
    }
  };

  // ✅ AxiosInstance -> jest.Mock 캐스팅 TS에러 방지(unknown 경유)
  const mockedCustomAxios = customAxios as unknown as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("uid와 limit만 전달할 경우 GET 요청을 보냅니다.", async () => {
    mockedCustomAxios.mockResolvedValue(mockResponse);

    const result = await getFollowers({ uid: mockUid, limit: 5 });

    expect(mockedCustomAxios).toHaveBeenCalledWith(
      `/api/user/${mockUid}/followers?limit=5`
    );
    expect(result).toEqual(mockResponse);
  });

  it("cursor가 포함되면 쿼리가 추가되어 요청을 보냅니다.", async () => {
    mockedCustomAxios.mockResolvedValue(mockResponse);

    const result = await getFollowers({
      uid: mockUid,
      limit: 15,
      cursor: "cursor-123"
    });

    expect(mockedCustomAxios).toHaveBeenCalledWith(
      `/api/user/${mockUid}/followers?limit=15&cursor=cursor-123`
    );
    expect(result).toEqual(mockResponse);
  });

  it("limit을 생략하면 기본값 10이 사용됩니다.", async () => {
    mockedCustomAxios.mockResolvedValue(mockResponse);

    await getFollowers({ uid: mockUid });

    expect(mockedCustomAxios).toHaveBeenCalledWith(
      `/api/user/${mockUid}/followers?limit=10`
    );
  });

  it("요청 중 에러 발생 시 예외를 그대로 throw 합니다.", async () => {
    const error = new Error("팔로워 목록 조회에 실패했어요.");
    mockedCustomAxios.mockRejectedValue(error);

    await expect(getFollowers({ uid: mockUid, limit: 10 })).rejects.toThrow(
      "팔로워 목록 조회에 실패했어요."
    );
  });
});
