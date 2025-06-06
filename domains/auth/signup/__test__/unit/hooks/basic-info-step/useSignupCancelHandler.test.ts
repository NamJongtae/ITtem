import { renderHook, act, waitFor } from "@testing-library/react";
import useSignupCancelHandler from "@/domains/auth/signup/hooks/basic-info-step/useSignupCancelHandler";
import { useRouter } from "next/navigation";

jest.mock("next/navigation");

describe("useSignupCancelHandler 훅 테스트", () => {
  const mockUseRouter = useRouter as jest.Mock;
  const mockRouterPush = jest.fn();
  
  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      push: mockRouterPush
    });
    jest.clearAllMocks();
  });

  it("cancelSignup을 호출하면 '/'로 이동해야 합니다.", async () => {
    const { result } = renderHook(() => useSignupCancelHandler());

    act(() => {
      result.current.cancelSignup();
    });

    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith("/");
      expect(mockRouterPush).toHaveBeenCalledTimes(1);
    });
  });
});
