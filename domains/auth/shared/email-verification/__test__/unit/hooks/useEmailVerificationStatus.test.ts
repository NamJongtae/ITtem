import { renderHook } from "@testing-library/react";
import { useFormContext } from "react-hook-form";
import { useContext } from "react";
import useEmailVerificationStatus from "../../../hooks/useEmailVerificationStatus";

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useFormContext: jest.fn()
}));

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: jest.fn()
}));

describe("useEmailVerificationStatus", () => {
  const mockUseFormContext = useFormContext as jest.Mock;
  const mockUseContext = useContext as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("emailStatus가 'SEND'일 때 isSendToVerificationEmail만 true여야 합니다.", () => {
    mockUseFormContext.mockReturnValue({
      formState: {
        errors: { email: null },
        dirtyFields: { email: true }
      }
    });

    mockUseContext.mockReturnValue({ emailStatus: "SEND" });

    const { result } = renderHook(() => useEmailVerificationStatus());

    expect(result.current.isSendToVerificationEmail).toBe(true);
    expect(result.current.isVerifiedEmail).toBe(false);
    expect(result.current.isDirty).toBe(true);
    expect(result.current.errors).toBe(null);
  });

  it("emailStatus가 'VERFICATION'일 때 isVerifiedEmail만 true여야 합니다.", () => {
    mockUseFormContext.mockReturnValue({
      formState: {
        errors: {},
        dirtyFields: { email: true }
      }
    });

    mockUseContext.mockReturnValue({ emailStatus: "VERFICATION" });

    const { result } = renderHook(() => useEmailVerificationStatus());

    expect(result.current.isSendToVerificationEmail).toBe(false);
    expect(result.current.isVerifiedEmail).toBe(true);
  });

  it("dirtyFields가 비어 있을 경우 isDirty는 unde입니다.", () => {
    mockUseFormContext.mockReturnValue({
      formState: {
        errors: {},
        dirtyFields: {}
      }
    });

    mockUseContext.mockReturnValue({ emailStatus: "SEND" });

    const { result } = renderHook(() => useEmailVerificationStatus());

    expect(result.current.isDirty).toBeUndefined();
  });

  it("email 필드에 에러가 있을 경우 errors 값을 반환합니다.", () => {
    const error = { type: "required", message: "이메일은 필수입니다." };

    mockUseFormContext.mockReturnValue({
      formState: {
        errors: { email: error },
        dirtyFields: { email: true }
      }
    });

    mockUseContext.mockReturnValue({ emailStatus: "SEND" });

    const { result } = renderHook(() => useEmailVerificationStatus());

    expect(result.current.errors).toEqual(error);
  });
});
