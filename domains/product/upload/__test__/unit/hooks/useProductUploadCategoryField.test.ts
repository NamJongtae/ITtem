import { renderHook, act } from "@testing-library/react";
import useProductUploadCategoryField from "../../../hooks/useProductUploadCategoryField";
import { ProductCategory } from "@/domains/product/shared/types/productTypes";
import { useFormContext } from "react-hook-form";

jest.mock("react-hook-form");

describe("useProductUploadCategoryField 훅 테스트 (모킹 방식)", () => {
  const mockUseFormContext = useFormContext as jest.Mock;
  let watchedValue: ProductCategory = ProductCategory.의류;
  const mockSetValue = jest.fn();

  beforeEach(() => {
    mockSetValue.mockClear();
    watchedValue = ProductCategory.의류;
    mockUseFormContext.mockImplementation(() => ({
      register: jest.fn(),
      setValue: mockSetValue,
      watch: (name: string) => {
        if (name === "category") return watchedValue;
        return undefined;
      }
    }));
  });

  it("초기 카테고리를 반환해야 합니다.", () => {
    const { result } = renderHook(() => useProductUploadCategoryField());
    expect(result.current.currentCategory).toBe(ProductCategory.의류);
  });

  it("handleClickCategory 호출 시 setValue가 호출되어야 하고, watchedValue도 바뀌어야 합니다.", () => {
    const { result, rerender } = renderHook(() =>
      useProductUploadCategoryField()
    );

    // 카테고리 변경 시도
    act(() => {
      result.current.handleClickCategory(ProductCategory.전자기기);
    });

    // setValue 함수가 호출되었는지 확인
    expect(mockSetValue).toHaveBeenCalledWith(
      "category",
      ProductCategory.전자기기,
      {
        shouldDirty: true
      }
    );

    // watch 값 강제로 변경 후 다시 훅 실행
    watchedValue = ProductCategory.전자기기;
    rerender();

    expect(result.current.currentCategory).toBe(ProductCategory.전자기기);
  });
});
