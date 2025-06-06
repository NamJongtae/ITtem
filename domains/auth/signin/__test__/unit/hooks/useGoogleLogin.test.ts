import { renderHook, act } from "@testing-library/react";
import { useRouter } from "next/navigation";
import useGoogleLogin from "../../../hooks/useGoogleLogin";

jest.mock("next/navigation");

const mockUseRouter = useRouter as jest.Mock;

describe("useGoogleLogin 훅 테스트", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID = "mockClientId";
    process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI = "mockRedirectUri";

    mockUseRouter.mockReturnValue({
      push: jest.fn() 
    });
  });

  afterEach(() => {
    delete process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    delete process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;
  });

  it("googleLogin 함수 호출 시 올바른 Google OAuth URL로 router.push가 호출되어야 합니다.", () => {
    const { result } = renderHook(() => useGoogleLogin());

    const { googleLogin } = result.current;

    const mockRouter = mockUseRouter();
    const mockRouterPush = mockRouter.push as jest.Mock; 

    act(() => {
      googleLogin();
    });

    const expectedUrl = `https://accounts.google.com/o/oauth2/v2/auth?
		client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
		&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}
		&response_type=code
		&scope=email profile&prompt=login`;

    expect(mockRouterPush).toHaveBeenCalledTimes(1); 
    expect(mockRouterPush).toHaveBeenCalledWith(expectedUrl); 
  });
});
