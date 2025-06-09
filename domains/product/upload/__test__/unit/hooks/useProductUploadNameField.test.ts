import { renderHook, act } from "@testing-library/react";
import useProductUploadNameField from "../../../hooks/useProductUploadNameField";
import { useFormContext } from "react-hook-form";

jest.mock("react-hook-form");

describe("useProductUploadNameField 훅 테스트", () => {
  const mockUseFormContext = useFormContext as jest.Mock;
  const mockSetValue = jest.fn();
  let mockName = "초기 상품명";

  beforeEach(() => {
    mockSetValue.mockClear();
    mockName = "초기 상품명";

    mockUseFormContext.mockImplementation(() => ({
      watch: (name: string) => (name === "name" ? mockName : undefined),
      setValue: mockSetValue
    }));
  });

  it("초기 productName 값을 반환합니다.", () => {
    const { result } = renderHook(() => useProductUploadNameField());

    expect(result.current.productName).toBe("초기 상품명");
  });

  it("handleChangeProductName 호출 시 앞에 공백이 있으면 trim 해서 setValue 호출합니다.", () => {
    const { result } = renderHook(() => useProductUploadNameField());

    const event = {
      target: {
        value: " 공백입력"
      }
    } as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleChangeProductName(event);
    });

    expect(mockSetValue).toHaveBeenCalledWith("name", "공백입력");
  });

  it("handleChangeProductName 호출 시 앞에 공백이 없으면 그대로 setValue 호출합니다.", () => {
    const { result } = renderHook(() => useProductUploadNameField());

    const event = {
      target: {
        value: "정상입력"
      }
    } as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleChangeProductName(event);
    });

    expect(mockSetValue).toHaveBeenCalledWith("name", "정상입력");
  });
});
