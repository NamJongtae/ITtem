import { renderHook } from "@testing-library/react";
import { useVerificationEmailSendHandler } from "../../../hooks/useVerificationEmailSendHandler";
import { useFormContext } from "react-hook-form";
import useSendVerificationEmailMutate from "../../../hooks/mutations/useSendVerificationEmailMutate";
import { EmailVerificationType } from "../../../types/emailVerificationTypes";
import { useContext } from "react";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: jest.fn()
}));
jest.mock("react-hook-form", () => ({
  useFormContext: jest.fn()
}));
jest.mock("../../../hooks/mutations/useSendVerificationEmailMutate");

describe("useVerificationEmailSendHandler", () => {
  const mockGetValues = jest.fn();
  const mockSend = jest.fn();
  const mockUseSendVerificationEmailMutate =
    useSendVerificationEmailMutate as jest.Mock;
  const mockUseFormContext = useFormContext as jest.Mock;
  const mockSendToVerificationEmailMutate = jest.fn();
  const mockUseContext = useContext as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseSendVerificationEmailMutate.mockReturnValue({
      sendToVerificationEmailMutate: mockSendToVerificationEmailMutate
    });

    mockUseFormContext.mockReturnValue({
      getValues: mockGetValues.mockReturnValue("test@example.com")
    });

    mockUseContext.mockReturnValue({
      send: mockSend
    });
  });

  it("validate가 true일 때 sendToEmail를 호출합니다.", async () => {
    const validateMock = jest.fn().mockResolvedValue(true);

    const { result } = renderHook(() =>
      useVerificationEmailSendHandler({
        validate: validateMock,
        type: "signup"
      })
    );

    await result.current.sendToEmailHandler();

    expect(validateMock).toHaveBeenCalled();
    expect(mockGetValues).toHaveBeenCalledWith("email");
    expect(mockSend).toHaveBeenCalled();
    expect(mockSendToVerificationEmailMutate).toHaveBeenCalledWith({
      email: "test@example.com",
      type: "signup"
    });
  });

  it("validate가 false일 경우 아무 동작도 하지 않습니다.", async () => {
    const validateMock = jest.fn().mockResolvedValue(false);

    const { result } = renderHook(() =>
      useVerificationEmailSendHandler({
        validate: validateMock,
        type: "RESET_PASSWORD" as EmailVerificationType
      })
    );

    await result.current.sendToEmailHandler();

    expect(validateMock).toHaveBeenCalled();
    expect(mockGetValues).not.toHaveBeenCalled();
    expect(mockSend).not.toHaveBeenCalled();
    expect(mockSendToVerificationEmailMutate).not.toHaveBeenCalled();
  });
});
