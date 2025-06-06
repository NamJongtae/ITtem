import useGoogleUserInfo from "@/domains/auth/signin/hooks/mutations/useGoogleUserInfoMutate";
import { GoogleAuthInfoResponseData } from "@/domains/auth/signin/types/responseTypes";
import getGoogleUser from "@/domains/user/shared/api/getGoogleUser";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";
import { renderHook, act, waitFor } from "@testing-library/react";
import { AxiosHeaders, AxiosResponse } from "axios";

jest.mock("@/domains/user/shared/api/getGoogleUser");
describe("useGoogleUserInfo 훅 테스트", () => {
  const mockGetGoogleUser = getGoogleUser as jest.Mock;
  const wrapper = createQueryClientWrapper();

  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("mutate 성공 시 user 정보를 반환합니다.", async () => {
    const fakeUser = {
      id: "123",
      email: "test@example.com"
    } as GoogleAuthInfoResponseData;

    const response: AxiosResponse<{
      user: GoogleAuthInfoResponseData;
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

    mockGetGoogleUser.mockResolvedValue(response);

    const { result } = renderHook(() => useGoogleUserInfo(), { wrapper });
    const code = "ABCDEFG";

    act(() => {
      result.current.googleUserInfoMutate(code);
    });

    await waitFor(() => {
      expect(mockGetGoogleUser).toHaveBeenCalledWith(code);
      expect(result.current.user).toEqual(fakeUser);
    });
  });
});
