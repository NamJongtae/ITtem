import checkNicknameDuplication from "../../../api/checkNicknameDuplication";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import { NicknameDuplicationResponseData } from "../../../types/responseTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("checkNicknameDuplication API 함수 테스트", () => {
  const mockNickname = "testuser";

  const mockResponse: AxiosResponse<NicknameDuplicationResponseData> = {
    data: {
      ok: true,
      message: "사용 가능한 닉네임입니다."
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

  it("닉네임 중복 확인 요청을 보내고 응답을 반환합니다.", async () => {
    (customAxios.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await checkNicknameDuplication(mockNickname);

    expect(customAxios.post).toHaveBeenCalledWith(
      "/api/auth/duplication/nickname",
      {
        nickname: mockNickname
      }
    );
    expect(result).toEqual(mockResponse);
  });

  it("요청 중 오류가 발생하면 예외를 던집니다.", async () => {
    const error = new Error("닉네임 확인에 실패하였습니다.");
    (customAxios.post as jest.Mock).mockRejectedValue(error);

    await expect(checkNicknameDuplication(mockNickname)).rejects.toThrow(
      "닉네임 확인에 실패하였습니다."
    );
  });
});
