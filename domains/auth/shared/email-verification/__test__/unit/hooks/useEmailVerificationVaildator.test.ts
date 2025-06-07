import { renderHook, act } from "@testing-library/react";
import { useFormContext } from "react-hook-form";
import useCheckEmailMutate from "@/domains/auth/shared/common/hooks/mutations/useCheckEmailMutate";
import useEmailDuplicationMutate from "@/domains/auth/shared/common/hooks/mutations/useEmailDuplicationMutate";
import { toast } from "react-toastify";
import { useEmailVerificationValidator } from "../../../hooks/useEmailVerificationVaildator";

jest.mock("react-hook-form", () => ({
  useFormContext: jest.fn()
}));

jest.mock("@/domains/auth/shared/common/hooks/mutations/useCheckEmailMutate");

jest.mock(
  "@/domains/auth/shared/common/hooks/mutations/useEmailDuplicationMutate"
);

jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  }
}));

describe("useEmailVerificationValidator 훅 테스트", () => {
  const mockUseFormContext = useFormContext as jest.Mock;
  const mockUseCheckEmailMutate = useCheckEmailMutate as jest.Mock;
  const mockUseEmailDuplicationMutate = useEmailDuplicationMutate as jest.Mock;
  const mockToastWarn = toast.warn as jest.Mock;
  const mockCheck = jest.fn().mockResolvedValue({});
  const mockDup = jest.fn().mockResolvedValue({});

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseCheckEmailMutate.mockReturnValue({
      checkEmailMutate: mockCheck
    });

    mockUseEmailDuplicationMutate.mockReturnValue({
      emailDuplicationMuate: mockDup
    });
  });

  it("이메일이 비어있으면 toast.warn을 호출하고 false 반환합니다.", async () => {
    mockUseFormContext.mockReturnValue({
      getValues: jest.fn().mockReturnValue("")
    });

    const { result } = renderHook(() =>
      useEmailVerificationValidator("resetPw")
    );

    const output = await act(() => result.current.validate());
    expect(mockToastWarn).toHaveBeenCalledWith("이메일을 입력해주세요.");
    expect(output).toBe(false);
  });

  it("type이 resetPw일 때 checkEmailMutate가 성공하면 true 반환합니다.", async () => {
    mockUseFormContext.mockReturnValue({
      getValues: jest.fn().mockReturnValue("test@example.com")
    });

    const { result } = renderHook(() =>
      useEmailVerificationValidator("resetPw")
    );

    const output = await act(() => result.current.validate());
    expect(mockCheck).toHaveBeenCalledWith("test@example.com");
    expect(output).toBe(true);
  });

  it("type이 resetPw일 때 checkEmailMutate가 실패하면 false 반환합니다.", async () => {
    mockUseFormContext.mockReturnValue({
      getValues: jest.fn().mockReturnValue("test@example.com")
    });

    const mockCheck = jest.fn().mockRejectedValue(new Error("실패"));
    mockUseCheckEmailMutate.mockReturnValue({
      checkEmailMutate: mockCheck
    });

    const { result } = renderHook(() =>
      useEmailVerificationValidator("resetPw")
    );

    const output = await act(() => result.current.validate());
    expect(output).toBe(false);
  });

  it("type이 resetPw가 아닐 때 emailDuplicationMuate가 성공하면 true 반환합니다.", async () => {
    mockUseFormContext.mockReturnValue({
      getValues: jest.fn().mockReturnValue("test@example.com")
    });

    const { result } = renderHook(() =>
      useEmailVerificationValidator("signup")
    );

    const output = await act(() => result.current.validate());
    expect(mockDup).toHaveBeenCalledWith("test@example.com");
    expect(output).toBe(true);
  });

  it("type이 resetPw가 아닐 때 emailDuplicationMuate가 실패하면 false 반환합니다.", async () => {
    mockUseFormContext.mockReturnValue({
      getValues: jest.fn().mockReturnValue("test@example.com")
    });

    const mockDup = jest
      .fn()
      .mockRejectedValue(new Error("중복된 이메일입니다."));
    mockUseEmailDuplicationMutate.mockReturnValue({
      emailDuplicationMuate: mockDup
    });

    const { result } = renderHook(() =>
      useEmailVerificationValidator("signup")
    );

    const output = await act(() => result.current.validate());
    expect(output).toBe(false);
  });
});
