import { renderHook } from "@testing-library/react";
import useProductUploadReturnPolicyField from "../../../hooks/useProductUploadReturnPolicyField";
import { useFormContext } from "react-hook-form";

jest.mock("react-hook-form");

describe("useProductUploadReturnPolicyField 훅 테스트", () => {
  const mockUseFormContext = useFormContext as jest.Mock;

  const mockRegister = jest.fn();
  const mockGetValues = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockGetValues.mockImplementation((name: string) =>
      name === "returnPolicy" ? "단순 변심은 반품이 불가합니다." : ""
    );

    mockUseFormContext.mockReturnValue({
      register: mockRegister,
      getValues: mockGetValues
    });
  });

  it("register는 함수로 반환됩니다.", () => {
    const { result } = renderHook(() => useProductUploadReturnPolicyField());

    expect(result.current.register).toBe(mockRegister);
  });

  it("returnPolicy 값이 getValues를 통해 반환됩니다.", () => {
    const { result } = renderHook(() => useProductUploadReturnPolicyField());

    expect(result.current.returnPolicy).toBe("단순 변심은 반품이 불가합니다.");
    expect(mockGetValues).toHaveBeenCalledWith("returnPolicy");
  });
});
