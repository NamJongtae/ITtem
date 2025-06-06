import { renderHook, act } from "@testing-library/react";
import { useCustomRouter } from "@/shared/common/hooks/useCustomRouter";
import useKakaoLogin from "../../../hooks/useKakaoLogin";

jest.mock("@/shared/common/hooks/useCustomRouter", () => ({
  useCustomRouter: jest.fn()
}));

const mockUseCustomRouter = useCustomRouter as jest.Mock;

describe("useKakaoLogin 훅 테스트", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY = "mockKakaoApiKey";
    process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI = "mockKakaoRedirectUri";
    mockUseCustomRouter.mockReturnValue({
      navigate: jest.fn() 
    });
  });

  afterEach(() => {
    delete process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
    delete process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  });

  it("kakaoLogin 함수 호출 시 올바른 Kakao OAuth URL과 함께 navigate 함수가 호출되어야 합니다.", () => {
    const { result } = renderHook(() => useKakaoLogin());
    const { kakaoLogin } = result.current;

    const mockCustomRouter = mockUseCustomRouter();
    const mockNavigate = mockCustomRouter.navigate as jest.Mock; // 

    act(() => {
      kakaoLogin(); 
    });

    const expectedUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&prompt=login`;

    expect(mockNavigate).toHaveBeenCalledTimes(1); 
    expect(mockNavigate).toHaveBeenCalledWith({
      type: "push",
      url: expectedUrl
    });
  });
});
