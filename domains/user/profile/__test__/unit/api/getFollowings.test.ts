import getFollowings from "../../../api/getFollowings";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import { FollowingsResponseData } from "../../../types/responseTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("getFollowing API 함수 테스트", () => {
  const mockUserIds = ["user-1", "user-2"];

  const mockResponse: AxiosResponse<FollowingsResponseData> = {
    data: {
      followings: [
        {
          uid: "user-1",
          nickname: "user123",
          profileImg: "http://storage.com/test1_profile.png",
          followers: ["my-user-id"],
          followings: ["user-456"],
          productIds: ["product-123"],
          reviewPercentage: 90
        },
        {
          uid: "user-2",
          nickname: "user234",
          profileImg: "http://storage.com/test2_profile.png",
          followers: ["my-user-id"],
          followings: ["user-456"],
          productIds: ["productId-234"],
          reviewPercentage: 80
        }
      ],
      message: "팔로잉 목록 조회에 성공했어요."
    },
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

  it("userIds와 limit만 전달할 경우 POST 요청을 보냅니다.", async () => {
    (customAxios.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getFollowings({ userIds: mockUserIds, limit: 5 });

    expect(customAxios.post).toHaveBeenCalledWith(
      "/api/profile/followings?limit=5",
      { userIds: mockUserIds }
    );

    expect(result).toEqual(mockResponse);
  });

  it("cursor가 포함되면 쿼리가 추가되어 요청을 보냅니다.", async () => {
    (customAxios.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getFollowings({
      userIds: mockUserIds,
      limit: 15,
      cursor: "cursor-123"
    });

    expect(customAxios.post).toHaveBeenCalledWith(
      "/api/profile/followings?limit=15&cursor=cursor-123",
      { userIds: mockUserIds }
    );

    expect(result).toEqual(mockResponse);
  });

  it("limit을 생략하면 기본값 10이 사용됩니다.", async () => {
    (customAxios.post as jest.Mock).mockResolvedValue(mockResponse);

    await getFollowings({ userIds: mockUserIds });

    expect(customAxios.post).toHaveBeenCalledWith(
      "/api/profile/followings?limit=10",
      { userIds: mockUserIds }
    );
  });

  it("요청 중 에러 발생 시 예외를 던집니다.", async () => {
    const error = new Error(
      "팔로잉 목록 조회에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
    (customAxios.post as jest.Mock).mockRejectedValue(error);

    await expect(
      getFollowings({ userIds: mockUserIds, limit: 10 })
    ).rejects.toThrow(
      "팔로잉 목록 조회에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
  });
});
