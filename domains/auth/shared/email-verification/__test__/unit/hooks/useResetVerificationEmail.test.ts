import { renderHook, act } from "@testing-library/react";
import { useContext } from "react";
import useResetVerificationEmail from "../../../hooks/useResetVerificationEmail";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: jest.fn()
}));

describe("useResetVerificationEmail.test 훅 테스트", () => {
  const mockSetEmailStatus = jest.fn();
  const mockUseContext = useContext as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseContext.mockReturnValue({
      setEmailStatus: mockSetEmailStatus
    });
  });

  it("resetSendToVerificationEmail: setEmailStatus 함수가 호출되어야 합니다.", async () => {
    const { result } = renderHook(() => useResetVerificationEmail());

    await act(async () => {
      result.current.resetSendToVerificationEmail();
    });

    expect(mockSetEmailStatus).toHaveBeenCalledWith("INITIAL");
  });
});
