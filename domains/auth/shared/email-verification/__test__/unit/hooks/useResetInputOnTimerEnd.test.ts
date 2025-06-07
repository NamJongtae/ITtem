import { renderHook } from "@testing-library/react";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import useResetInputOnTimerEnd from "../../../hooks/useResetInputOnTimerEnd";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: jest.fn()
}));
jest.mock("react-hook-form", () => ({
  useFormContext: jest.fn()
}));

describe("useResetInputOnTimerEnd 훅 테스트", () => {
  const mockSetValue = jest.fn();
  const mockUseFormContext = useFormContext as jest.Mock;
  const mockUseContext = useContext as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseFormContext.mockReturnValue({
      setValue: mockSetValue
    });
  });

  it("timer가 0 이하일 경우 setValue로 verificationCode를 초기화해야 합니다.", () => {
    mockUseContext.mockReturnValue({ timer: 0 });

    renderHook(() => useResetInputOnTimerEnd());

    expect(mockSetValue).toHaveBeenCalledWith("verificationCode", "");
  });

  it("timer가 1 이상일 경우 setValue가 호출되지 않아야 합니다.", () => {
    mockUseContext.mockReturnValue({ timer: 30 });

    renderHook(() => useResetInputOnTimerEnd());

    expect(mockSetValue).not.toHaveBeenCalled();
  });
});
