import { renderHook } from "@testing-library/react";
import useProductUploadSellTypeField from "../../../hooks/useProductUploadSellTypeField";
import { useFormContext } from "react-hook-form";

jest.mock("react-hook-form");

describe("useProductUploadSellTypeField 훅 테스트", () => {
  const mockUseFormContext = useFormContext as jest.Mock;

  const mockRegister = jest.fn();
  const mockGetValues = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockGetValues.mockImplementation((name: string) =>
      name === "sellType" ? "즉시판매" : ""
    );

    mockUseFormContext.mockReturnValue({
      register: mockRegister,
      getValues: mockGetValues
    });
  });

  it("register는 함수로 반환됩니다.", () => {
    const { result } = renderHook(() => useProductUploadSellTypeField());

    expect(result.current.register).toBe(mockRegister);
  });

  it("sellType 값이 getValues를 통해 반환됩니다.", () => {
    const { result } = renderHook(() => useProductUploadSellTypeField());

    expect(result.current.sellType).toBe("즉시판매");
    expect(mockGetValues).toHaveBeenCalledWith("sellType");
  });
});
