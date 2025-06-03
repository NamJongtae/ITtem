import unfollowUser from "../../../api/unfollowUser";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import { ApiResponse } from "@/shared/common/types/responseTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("unfollowUser API 함수 테스트", () => {
  const mockUid = "user-123";

  const mockResponse: AxiosResponse<ApiResponse> = {
    data: { message: "유저 언팔로우에 성공했어요." },
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

  it("DELETE 요청을 보내고 응답을 받습니다.", async () => {
    (customAxios.delete as jest.Mock).mockResolvedValue(mockResponse);

    const result = await unfollowUser(mockUid);

    expect(customAxios.delete).toHaveBeenCalledWith(
      `/api/profile/${mockUid}/follow`
    );
    expect(result).toEqual(mockResponse);
  });

  it("요청 실패 시 예외를 던집니다.", async () => {
    const error = new Error(
      "유저 언팔로우에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
    (customAxios.delete as jest.Mock).mockRejectedValue(error);

    await expect(unfollowUser(mockUid)).rejects.toThrow(
      "유저 언팔로우에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
  });
});
