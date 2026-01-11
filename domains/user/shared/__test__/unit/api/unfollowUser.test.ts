import unfollowUser from "../../../api/unfollowUser";
import { customFetch } from "@/shared/common/utils/customFetch";
import { ApiResponse } from "@/shared/common/types/responseTypes";

jest.mock("@/shared/common/utils/customFetch", () => ({
  __esModule: true,
  customFetch: jest.fn()
}));

type FetchError = {
  status: number;
  message: string;
};

describe("unfollowUser API 함수 테스트", () => {
  const mockUid = "user-123";
  const mockedCustomFetch = customFetch as jest.MockedFunction<
    typeof customFetch
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("DELETE 요청을 보내고 응답 데이터(ApiResponse)를 반환합니다.", async () => {
    const mockData: ApiResponse = { message: "유저 언팔로우에 성공했어요." };
    mockedCustomFetch.mockResolvedValue(mockData as any);

    const result = await unfollowUser(mockUid);

    expect(mockedCustomFetch).toHaveBeenCalledWith(
      `/api/user/${mockUid}/follow`,
      {
        method: "DELETE"
      }
    );
    expect(result).toEqual(mockData);
  });

  it("요청 실패 시 FetchError(status, message)를 throw 합니다.", async () => {
    const error: FetchError = {
      status: 500,
      message: "유저 언팔로우에 실패했어요.\n잠시 후 다시 시도해주세요."
    };
    mockedCustomFetch.mockRejectedValue(error);

    await expect(unfollowUser(mockUid)).rejects.toMatchObject({
      status: 500,
      message: "유저 언팔로우에 실패했어요.\n잠시 후 다시 시도해주세요."
    });
  });

  it("세션 만료 케이스는 Error('SESSION_EXPIRED')를 throw 합니다.", async () => {
    mockedCustomFetch.mockRejectedValue(new Error("SESSION_EXPIRED"));

    await expect(unfollowUser(mockUid)).rejects.toThrow("SESSION_EXPIRED");
  });
});
