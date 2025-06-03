import { changePassword } from "../../../api/changePassword";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import { ApiResponse } from "@/shared/common/types/responseTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("changePassword API 함수 테스트", () => {
  const mockPasswordData = {
    password: "newPassword123!",
    currentPassword: "oldPassword123!"
  };

  const mockResponse: AxiosResponse<ApiResponse> = {
    data: {
      message: "비밀번호가 변경되었어요."
    },
    status: 200,
    statusText: "OK",
    headers: {},
    config: {
      headers: new AxiosHeaders(),
      url: "",
      method: "patch"
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("비밀번호 변경 요청이 정상적으로 처리되면 응답을 반환합니다.", async () => {
    (customAxios.patch as jest.Mock).mockResolvedValue(mockResponse);

    const result = await changePassword(mockPasswordData);

    expect(customAxios.patch).toHaveBeenCalledWith(
      "/api/auth/change-password",
      mockPasswordData
    );
    expect(result).toEqual(mockResponse);
  });

  it("API 요청 중 에러가 발생하면 예외를 던집니다.", async () => {
    (customAxios.patch as jest.Mock).mockRejectedValue(
      new Error("비밀번호 변경에 실패하였습니다.\n잠시 후 다시 시도해주세요.")
    );

    await expect(changePassword(mockPasswordData)).rejects.toThrow(
      "비밀번호 변경에 실패하였습니다.\n잠시 후 다시 시도해주세요."
    );
  });
});
