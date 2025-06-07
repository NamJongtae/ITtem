import { renderHook, act } from "@testing-library/react";
import useVerificationTimer from "../../../hooks/useVerificationTimer";
import { useFormContext } from "react-hook-form";
import { useContext } from "react";
import { toast } from "react-toastify";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: jest.fn()
}));
jest.mock("react-hook-form", () => ({
  useFormContext: jest.fn()
}));
jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  }
}));

describe("useVerificationTimer", () => {
  const mockSetError = jest.fn();
  const mockSetValue = jest.fn();
  const mockCountDown = jest.fn();
  const mockUseContext = useContext as jest.Mock;
  const mockUseFormContext = useFormContext as jest.Mock;
  const mockToastWarn = toast.warn as jest.Mock;
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();

    mockUseContext.mockReturnValue({
      timer: 10,
      emailStatus: "SEND",
      countDown: mockCountDown,
      isError: false
    });

    mockUseFormContext.mockReturnValue({
      setError: mockSetError,
      setValue: mockSetValue
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("타이머가 0이고 오류가 없을 때 setError와 toast.warn을 호출합니다.", () => {
    mockUseContext.mockReturnValueOnce({
      timer: 0,
      emailStatus: "SEND",
      countDown: mockCountDown,
      isError: false
    });

    renderHook(() => useVerificationTimer());

    expect(mockSetError).toHaveBeenCalledWith("verificationCode", {
      type: "validate",
      message: "인증 시간이 만료되었어요. 인증 재요청을 해주세요."
    });
    expect(mockToastWarn).toHaveBeenCalledWith("인증 시간이 만료되었어요.");
  });

  it("타이머가 0보다 크고 상태가 SEND일 때 countDown을 1초 후에 호출합니다.", () => {
    renderHook(() => useVerificationTimer());

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(mockCountDown).toHaveBeenCalled();
  });

  it("타이머가 0일 때 setValue를 호출하여 인증코드를 비웁니다.", () => {
    mockUseContext.mockReturnValueOnce({
      timer: 0,
      emailStatus: "SEND",
      countDown: mockCountDown,
      isError: false
    });

    renderHook(() => useVerificationTimer());

    expect(mockSetValue).toHaveBeenCalledWith("verificationCode", "");
  });

  it("emailStatus가 SEND가 아닐 경우 countDown이 호출되지 않습니다.", () => {
    mockUseContext.mockReturnValue({
      timer: 10,
      emailStatus: "NONE",
      countDown: mockCountDown,
      isError: false
    });

    renderHook(() => useVerificationTimer());

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(mockCountDown).not.toHaveBeenCalled();
  });

  it("umount시 clearTimeout이 호출됩니다.", () => {
    jest.spyOn(global, "clearTimeout");

    global.clearTimeout = jest.fn();

    mockUseContext.mockReturnValueOnce({
      timer: 10,
      emailStatus: "SEND",
      countDown: mockCountDown,
      isError: false
    });

    const { unmount } = renderHook(() => useVerificationTimer());

    unmount();

    expect(clearTimeout).toHaveBeenCalled();
  });
});
