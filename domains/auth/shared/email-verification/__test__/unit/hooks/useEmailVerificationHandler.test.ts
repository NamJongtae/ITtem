import { renderHook, act } from "@testing-library/react";
import { useFormContext } from "react-hook-form";
import useEmailVerificationHandler from "../../../hooks/useEmailVerificationHandler";
import useVerificationEmailMutate from "../../../hooks/mutations/useVerificationEmailMutate";
import { toast } from "react-toastify";

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useFormContext: jest.fn()
}));

jest.mock("../../../hooks/mutations/useVerificationEmailMutate");

jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  }
}));

describe("useEmailVerificationHandler 훅 테스트", () => {
  const mockUseFormContext = useFormContext as jest.Mock;
  const mockUseVerificationEmailMutate =
    useVerificationEmailMutate as jest.Mock;
  const mockToastWarn = toast.warn as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("verificationEmailLoading 값을 반환해야 합니다.", () => {
    mockUseFormContext.mockReturnValue({
      getValues: jest.fn()
    });

    mockUseVerificationEmailMutate.mockReturnValue({
      verificationEmailMuate: jest.fn(),
      verificationEmailLoading: true
    });

    const { result } = renderHook(() => useEmailVerificationHandler("signup"));

    expect(result.current.verificationEmailLoading).toBe(true);
  });

  it("handleClickVerificationEmail: 인증번호가 없으면 toast.warn을 호출하고 mutate를 실행하지 않아야합니다.", async () => {
    mockUseFormContext.mockReturnValue({
      getValues: jest.fn().mockImplementation((field) => {
        if (field === "email") return "test@example.com";
        if (field === "verificationCode") return ""; // 인증번호 없음
      })
    });

    const verificationEmailMuate = jest.fn();
    mockUseVerificationEmailMutate.mockReturnValue({
      verificationEmailMuate,
      verificationEmailLoading: false
    });

    const { result } = renderHook(() => useEmailVerificationHandler("signup"));

    await act(async () => {
      await result.current.handleClickVerificationEmail();
    });

    expect(mockToastWarn).toHaveBeenCalledWith("인증번호를 입력해주세요.");
    expect(verificationEmailMuate).not.toHaveBeenCalled();
  });

  it("handleClickVerificationEmail: 인증번호가 있을 경우 mutate를 호출합니다.", async () => {
    mockUseFormContext.mockReturnValue({
      getValues: jest.fn().mockImplementation((field) => {
        if (field === "email") return "test@example.com";
        if (field === "verificationCode") return "123456";
      })
    });

    const verificationEmailMuate = jest.fn();
    mockUseVerificationEmailMutate.mockReturnValue({
      verificationEmailMuate,
      verificationEmailLoading: false
    });

    const { result } = renderHook(() => useEmailVerificationHandler("signup"));

    await act(async () => {
      await result.current.handleClickVerificationEmail();
    });

    expect(verificationEmailMuate).toHaveBeenCalledWith({
      email: "test@example.com",
      verificationCode: "123456",
      type: "signup"
    });
    expect(mockToastWarn).not.toHaveBeenCalled();
  });
});
