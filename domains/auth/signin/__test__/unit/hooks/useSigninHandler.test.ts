import { renderHook, act } from "@testing-library/react";
import useSigninHandler from "../../../hooks/useSigninHandler";
import useSigninMutate from "../../../hooks/mutations/useSigninMutate";

jest.mock("../../../hooks/mutations/useSigninMutate", () => ({
  __esModule: true,
  default: jest.fn()
}));

const mockUseSigninMutate = useSigninMutate as jest.Mock;
const mockSigninMutate = jest.fn();
const mockSigninLoading = false; 

describe("useSigninHandler 훅 테스트", () => {
  beforeEach(() => {
    mockSigninMutate.mockReset();
    mockUseSigninMutate.mockReturnValue({
      signinMutate: mockSigninMutate,
      signinLoading: mockSigninLoading 
    });
  });

  it("handleSignin 함수는 올바른 이메일과 패스워드로 signinMutate를 호출해야 합니다.", async () => {

    const { result } = renderHook(() => useSigninHandler({ isModal: false }));

    const { handleSignin } = result.current;

    const testFormData = {
      email: "test@example.com",
      password: "testPassword123",
    };

    await act(async () => {
      await handleSignin(testFormData);
    });


    expect(mockSigninMutate).toHaveBeenCalledTimes(1);

    expect(mockSigninMutate).toHaveBeenCalledWith({
      email: testFormData.email,
      password: testFormData.password
    });
  });

  it("훅은 useSigninMutate에서 반환된 signinLoading 상태를 올바르게 노출해야 합니다.", () => {
    const loadingState = true;
    mockUseSigninMutate.mockReturnValue({
      signinMutate: mockSigninMutate,
      signinLoading: loadingState 
    });

    const { result } = renderHook(() => useSigninHandler({ isModal: true }));

    expect(result.current.signinLoading).toBe(loadingState);
  });

  it("훅은 useSigninMutate에 isModal 옵션을 올바르게 전달해야 합니다.", () => {
    const isModalValue = true;
    renderHook(() => useSigninHandler({ isModal: isModalValue }));

    expect(mockUseSigninMutate).toHaveBeenCalledTimes(1);
    expect(mockUseSigninMutate).toHaveBeenCalledWith({ isModal: isModalValue });
  });
});
