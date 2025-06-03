import signout from "../../../api/signout";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import { ApiResponse } from "@/shared/common/types/responseTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("signout API 함수 테스트", () => {
  const mockUid = "user123";

  const mockResponse: AxiosResponse<ApiResponse> = {
    data: {
      message: "로그아웃에 성공했어요."
    },
    status: 200,
    statusText: "OK",
    headers: {},
    config: {
      headers: new AxiosHeaders()
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("로그아웃 요청을 성공적으로 보냅니다.", async () => {
    (customAxios.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await signout(mockUid);

    expect(customAxios.post).toHaveBeenCalledWith("/api/auth/signout", {
      uid: mockUid
    });
    expect(result).toEqual(mockResponse);
  });

  it("API 요청 중 에러가 발생하면 예외를 던집니다.", async () => {
    const mockError = new Error(
      "로그아웃에 실패했어요.\n 잠시 후 다시 시도해주세요."
    );
    (customAxios.post as jest.Mock).mockRejectedValue(mockError);

    await expect(signout(mockUid)).rejects.toThrow(
      "로그아웃에 실패했어요.\n 잠시 후 다시 시도해주세요."
    );
  });
});
