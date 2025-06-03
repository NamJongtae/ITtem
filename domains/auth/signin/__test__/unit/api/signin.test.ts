import sigin from "../../../api/signin";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import { SigninResponseData } from "../../../types/responseTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("sigin API  함수 테스트", () => {
  const email = "test@example.com";
  const password = "Password123!";
  const isDuplicateLogin = true;

  const mockResponse: AxiosResponse<SigninResponseData> = {
    data: {
      message: "로그인에 성공했어요.",
      user: {
        uid: "user123",
        email,
        nickname: "tester",
        profileImg: "https://mock-storage.com/profile.png"
      }
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

  it("정상적으로 로그인 요청을 보내고 응답을 받습니다.", async () => {
    (customAxios.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await sigin(email, password, isDuplicateLogin);

    expect(customAxios.post).toHaveBeenCalledWith("/api/auth/signin", {
      email,
      password,
      isDuplicateLogin
    });
    expect(result).toEqual(mockResponse);
  });

  it("isDuplicateLogin이 undefined, false여도 요청이 정상적으로 처리되어야 합니다.", async () => {
    (customAxios.post as jest.Mock).mockResolvedValue(mockResponse);

    const result1 = await sigin(email, password);
    const result2 = await sigin(email, password, false);

    expect(customAxios.post).toHaveBeenNthCalledWith(1, "/api/auth/signin", {
      email,
      password,
      isDuplicateLogin: undefined
    });

    expect(customAxios.post).toHaveBeenNthCalledWith(2, "/api/auth/signin", {
      email,
      password,
      isDuplicateLogin: false
    });

    expect(result1).toEqual(mockResponse);
    expect(result2).toEqual(mockResponse);
  });

  it("API 요청 중 에러가 발생하면 예외를 던집니다.", async () => {
    const error = new Error("로그인에 실패했어요.\n잠시 후 다시 시도해주세요.");
    (customAxios.post as jest.Mock).mockRejectedValue(error);

    await expect(sigin(email, password)).rejects.toThrow(
      "로그인에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
  });
});
