import { renderHook, act } from "@testing-library/react";
import useProfileProductCategory from "../../../hooks/useProfileProductCategory";
import { ProductCategory } from "@/domains/product/shared/types/productTypes";

describe("useProfileProductCategory 훅 테스트", () => {
  it("초기값은 '전체'입니다.", () => {
    const { result } = renderHook(() => useProfileProductCategory());

    expect(result.current.category).toBe(ProductCategory.전체);
  });

  it("selectCategory를 호출하면 category가 변경됩니다.", () => {
    const { result } = renderHook(() => useProfileProductCategory());

    act(() => {
      result.current.selectCategory(ProductCategory.가방지갑);
    });

    expect(result.current.category).toBe(ProductCategory.가방지갑);
  });
});
