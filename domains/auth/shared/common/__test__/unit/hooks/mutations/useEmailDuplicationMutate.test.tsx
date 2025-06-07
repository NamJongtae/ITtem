import { renderHook, act } from "@testing-library/react";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import useEmailDuplicationMutate from "../../../../hooks/mutations/useEmailDuplicationMutate";
import checkEmailDuplication from "../../../../api/checkEmailDuplication";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";

jest.mock("../../../../api/checkEmailDuplication");
jest.mock("react-hook-form");
jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  }
}));

jest.mock("axios", () => ({
  ...jest.requireActual("axios"),
  isAxiosError: () => true
}));

describe("useEmailDuplicationMutate 훅 테스트", () => {
  const mockSetError = jest.fn();
  const mockToastWarn = toast.warn as jest.Mock;
  const mockCheckEmailDuplication = checkEmailDuplication as jest.Mock;

  const wrapper = createQueryClientWrapper();

  beforeEach(() => {
    jest.clearAllMocks();
    (useFormContext as jest.Mock).mockReturnValue({
      setError: mockSetError
    });
  });

  it("이메일 중복 검사 API가 호출됩니다.", async () => {
    mockCheckEmailDuplication.mockResolvedValue({
      data: { duplicated: false }
    });

    const { result } = renderHook(() => useEmailDuplicationMutate(), {
      wrapper
    });

    await act(async () => {
      await result.current.emailDuplicationMuate("test@example.com");
    });

    expect(mockCheckEmailDuplication).toHaveBeenCalledWith("test@example.com");
  });

  it("401 에러 발생 시 setError가 호출됩니다.", async () => {
    const error = {
      response: {
        status: 401,
        data: { message: "이미 사용중인 이메일이에요." }
      }
    };

    mockCheckEmailDuplication.mockRejectedValue(error);

    const { result } = renderHook(() => useEmailDuplicationMutate(), {
      wrapper
    });

    await act(async () => {
      await result.current
        .emailDuplicationMuate("test@example.com")
        .catch(() => {});
    });

    expect(mockSetError).toHaveBeenCalledWith("email", {
      type: "duplication",
      message: "이미 사용중인 이메일이에요."
    });
  });

  it("기타 에러 발생 시 toast.warn이 호출됩니다.", async () => {
    const error = {
      response: {
        status: 500,
        data: { message: "서버 에러" }
      }
    };

    mockCheckEmailDuplication.mockRejectedValue(error);

    const { result } = renderHook(() => useEmailDuplicationMutate(), {
      wrapper
    });

    await act(async () => {
      await result.current
        .emailDuplicationMuate("test@example.com")
        .catch(() => {});
    });

    expect(mockToastWarn).toHaveBeenCalled();
  });
});
