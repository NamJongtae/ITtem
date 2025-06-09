import { renderHook, act } from "@testing-library/react";
import useProductUploadLocationField from "@/domains/product/upload/hooks/location-field/useProductUploadLocationField";
import { useFormContext } from "react-hook-form";

jest.mock("react-hook-form");

describe("useProductUploadLocationField 훅 테스트", () => {
  const mockRegister = jest.fn();
  const mockSetValue = jest.fn();
  const mockUseFormContext = useFormContext as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseFormContext.mockImplementation(() => ({
      register: mockRegister,
      setValue: mockSetValue
    }));
  });

  it("register와 setLocationValue를 반환합니다.", () => {
    const { result } = renderHook(() => useProductUploadLocationField());

    expect(result.current.register).toBe(mockRegister);
    expect(typeof result.current.setLocationValue).toBe("function");
  });

  it("setLocationValue가 setValue를 올바르게 호출합니다.", () => {
    const { result } = renderHook(() => useProductUploadLocationField());

    act(() => {
      result.current.setLocationValue("부산");
    });

    expect(mockSetValue).toHaveBeenCalledWith("location", "부산", {
      shouldDirty: true
    });
  });
});
