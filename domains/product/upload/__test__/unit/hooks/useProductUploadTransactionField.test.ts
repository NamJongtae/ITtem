import { renderHook } from "@testing-library/react";
import useProductUploadTransactionField from "../../../hooks/useProductUploadTransactionField";
import { useFormContext } from "react-hook-form";

jest.mock("react-hook-form");

describe("useProductUploadTransactionField 훅 테스트", () => {
  const mockUseFormContext = useFormContext as jest.Mock;

  const mockRegister = jest.fn();
  const mockGetValues = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockGetValues.mockImplementation((name: string) =>
      name === "transaction" ? "직거래" : ""
    );

    mockUseFormContext.mockReturnValue({
      register: mockRegister,
      getValues: mockGetValues
    });
  });

  it("register는 함수로 반환됩니다.", () => {
    const { result } = renderHook(() => useProductUploadTransactionField());

    expect(result.current.register).toBe(mockRegister);
  });

  it("transaction 값이 getValues를 통해 반환됩니다.", () => {
    const { result } = renderHook(() => useProductUploadTransactionField());

    expect(result.current.transaction).toBe("직거래");
    expect(mockGetValues).toHaveBeenCalledWith("transaction");
  });
});
