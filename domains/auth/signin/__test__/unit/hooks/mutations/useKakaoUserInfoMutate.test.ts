import useKakaoUserInfoMutate from "@/domains/auth/signin/hooks/mutations/useKakaoUserInfoMutate";
import { KakaoAuthInfoResponseData } from "@/domains/auth/signin/types/responseTypes";
import getKakaoUser from "@/domains/user/shared/api/getKakaoUser";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";
import { renderHook, act, waitFor } from "@testing-library/react";
import { AxiosHeaders, AxiosResponse } from "axios";

jest.mock("@/domains/user/shared/api/getKakaoUser");
describe("useKakaoUserInfoMutate 훅 테스트", () => {
  const mockGetKakaoUser = getKakaoUser as jest.Mock;
  const { Wrapper: wrapper } = createQueryClientWrapper();

  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("utate 성공 시 user 정보를 반환합니다.", async () => {
    const fakeUser = {
      id: 123,
      properties: {
        nickname: "user123"
      }
    } as KakaoAuthInfoResponseData;

    const response: AxiosResponse<{
      user: KakaoAuthInfoResponseData;
      message: string;
    }> = {
      data: {
        message: "유저정보를 성공적으로 불러왔어요.",
        user: fakeUser
      },
      status: 200,
      statusText: "ok",
      headers: {},
      config: {
        headers: new AxiosHeaders()
      }
    };

    mockGetKakaoUser.mockResolvedValue(response);

    const { result } = renderHook(() => useKakaoUserInfoMutate(), { wrapper });
    const code = "ABCDEFG";

    act(() => {
      result.current.kakaoUserInfoMutate(code);
    });

    await waitFor(() => {
      expect(mockGetKakaoUser).toHaveBeenCalledWith(code);
      expect(result.current.user).toEqual(fakeUser);
    });
  });
});
