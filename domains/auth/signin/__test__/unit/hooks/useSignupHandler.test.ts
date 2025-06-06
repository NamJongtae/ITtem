import { renderHook, act } from "@testing-library/react";
import useSignupHandler from "../../../hooks/useSignupHandler";
import * as useSignupMutateModule from "@/domains/auth/signup/hooks/mutations/useSignupMutate";

jest.mock("@/domains/auth/signup/hooks/mutations/useSignupMutate");

const mockUseSignupMutate = useSignupMutateModule.default as jest.Mock;
const mockSignupMutate = jest.fn();
const mockSignupLoading = false;

describe("useSignupHandler 훅 테스트", () => {
  beforeEach(() => {
    mockSignupMutate.mockReset();
    mockUseSignupMutate.mockReturnValue({
      signupMutate: mockSignupMutate,
      signupLoading: mockSignupLoading
    });
  });

  it("onSubmit 함수는 올바른 데이터를 사용하여 signupMutate를 호출해야 합니다.", async () => {
    const { result } = renderHook(() => useSignupHandler());

    const { onSubmit } = result.current;

    const testFormData = {
      email: "test@example.com",
      password: "testPassword123",
      nickname: "testNickname",
      profileImg: "testProfileImgFile",
      introduce: "testIntroduce",
      // 폼에 다른 필드가 있더라도 onSubmit은 지정된 필드만 추출합니다.
      otherField: "someValue"
    };

    await act(async () => {
      await onSubmit(testFormData);
    });

    expect(mockSignupMutate).toHaveBeenCalledTimes(1);

    expect(mockSignupMutate).toHaveBeenCalledWith({
      email: testFormData.email,
      password: testFormData.password,
      nickname: testFormData.nickname,
      profileImgFile: testFormData.profileImg,
      introduce: testFormData.introduce
    });
  });

  it("훅은 useSignupMutate에서 반환된 signupLoading 상태를 올바르게 노출해야 합니다.", () => {
    const loadingState = true;
    mockUseSignupMutate.mockReturnValue({
      signupMutate: mockSignupMutate,
      signupLoading: loadingState
    });

    const { result } = renderHook(() => useSignupHandler());

    expect(result.current.signupLoading).toBe(loadingState);
  });
});
