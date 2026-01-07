import getSessionCookies from "@/domains/auth/shared/common/api/getSessionCookies";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import { SessionCookiesResponseData } from "@/domains/auth/shared/common/types/responseTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("getSessionCookies API 함수 테스트", () => {
  const mockResponse: AxiosResponse<SessionCookiesResponseData> = {
    data: {
      ok: true,
      message: "세션 쿠기가 존재해요."
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

  it("GET 요청을 보내고 세션 쿠키 데이터를 반환합니다.", async () => {
    (customAxios.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getSessionCookies();

    expect(customAxios.get).toHaveBeenCalledWith("/api/auth/session-cookie");
    expect(result).toEqual(mockResponse);
  });

  it("요청 중 오류가 발생하면 예외를 던집니다.", async () => {
    const error = new Error("세션 쿠키 조회에 실패했어요.");
    (customAxios.get as jest.Mock).mockRejectedValue(error);

    await expect(getSessionCookies()).rejects.toThrow(
      "세션 쿠키 조회에 실패했어요."
    );
  });
});
