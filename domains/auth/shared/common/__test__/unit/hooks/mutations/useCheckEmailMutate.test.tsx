import { renderHook, act } from "@testing-library/react";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import useCheckEmailMutate from "../../../../hooks/mutations/useCheckEmailMutate";
import checkEmail from "../../../../api/checkEmail";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";

jest.mock("../../../../api/checkEmail");
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

describe("useCheckEmailMutate 훅 테스트", () => {
  const mockSetError = jest.fn();
  const mockToastWarn = toast.warn as jest.Mock;
  const mockCheckEmail = checkEmail as jest.Mock;

  const wrapper = createQueryClientWrapper();

  beforeEach(() => {
    jest.clearAllMocks();
    (useFormContext as jest.Mock).mockReturnValue({
      setError: mockSetError
    });
  });

  it("성공적으로 checkEmail API를 호출합니다.", async () => {
    mockCheckEmail.mockResolvedValue({ data: true });

    const { result } = renderHook(() => useCheckEmailMutate(), { wrapper });

    await act(async () => {
      await result.current.checkEmailMutate("test@example.com");
    });

    expect(mockCheckEmail).toHaveBeenCalledWith("test@example.com");
  });

  it("401 에러 발생 시 setError가 호출됩니다.", async () => {
    const error = {
      response: {
        status: 401,
        data: { message: "중복된 이메일입니다." }
      }
    };
    mockCheckEmail.mockRejectedValue(error);

    const { result } = renderHook(() => useCheckEmailMutate(), { wrapper });

    await act(async () => {
      await result.current.checkEmailMutate("test@example.com").catch(() => {});
    });

    expect(mockSetError).toHaveBeenCalledWith("email", {
      type: "checkEmail",
      message: "중복된 이메일입니다."
    });
  });

  it("기타 Axios 에러 발생 시 toast.warn이 호출됩니다.", async () => {
    const error = {
      response: {
        status: 500,
        data: { message: "서버 오류" }
      }
    };
    mockCheckEmail.mockRejectedValue(error);

    const { result } = renderHook(() => useCheckEmailMutate(), { wrapper });

    await act(async () => {
      await result.current.checkEmailMutate("test@example.com").catch(() => {});
    });

    expect(mockToastWarn).toHaveBeenCalled();
  });
});
