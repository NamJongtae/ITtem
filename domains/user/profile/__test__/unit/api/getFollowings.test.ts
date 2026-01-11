import getFollowings from "../../../api/getFollowings";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import { FollowingsResponseData } from "../../../types/responseTypes";

jest.mock("@/shared/common/utils/customAxios", () => ({
  __esModule: true,
  default: {
    get: jest.fn()
  }
}));

describe("getFollowings", () => {
  const mockUid = "user-1";

  const mockResponse: AxiosResponse<FollowingsResponseData> = {
    data: {
      followings: [
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
      ],
      message: "팔로잉 목록 조회에 성공했어요."
    } as any,
    status: 200,
    statusText: "ok",
    headers: {},
    config: {
      headers: new AxiosHeaders()
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("uid와 limit만 전달할 경우 GET 요청을 보냅니다.", async () => {
    (customAxios.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getFollowings({ uid: mockUid, limit: 5 });

    expect(customAxios.get).toHaveBeenCalledWith(
      `/api/user/${mockUid}/followings?limit=5`
    );
    expect(result).toEqual(mockResponse);
  });

  it("cursor가 포함되면 쿼리가 추가되어 요청을 보냅니다.", async () => {
    (customAxios.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getFollowings({
      uid: mockUid,
      limit: 15,
      cursor: "cursor-123"
    });

    expect(customAxios.get).toHaveBeenCalledWith(
      `/api/user/${mockUid}/followings?limit=15&cursor=cursor-123`
    );
    expect(result).toEqual(mockResponse);
  });

  it("limit을 생략하면 기본값 10이 사용됩니다.", async () => {
    (customAxios.get as jest.Mock).mockResolvedValue(mockResponse);

    await getFollowings({ uid: mockUid });

    expect(customAxios.get).toHaveBeenCalledWith(
      `/api/user/${mockUid}/followings?limit=10`
    );
  });

  it("요청 중 에러 발생 시 예외를 그대로 throw 합니다.", async () => {
    const error = new Error("팔로잉 목록 조회에 실패했어요.");
    (customAxios.get as jest.Mock).mockRejectedValue(error);

    await expect(getFollowings({ uid: mockUid, limit: 10 })).rejects.toThrow(
      "팔로잉 목록 조회에 실패했어요."
    );
  });
});
