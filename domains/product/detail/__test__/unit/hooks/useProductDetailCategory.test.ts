import { renderHook } from "@testing-library/react";
import { useProductDetailCategory } from "../../../hooks/useProductDetailCategory";
import { CATEGORY } from "@/domains/product/shared/constants/constants";
import { useSearchParams } from "next/navigation";

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn()
}));

describe("useProductDetailCategory 훅 테스트", () => {
  const mockUseSearchParams = useSearchParams as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("query(category_id)가 유효한 숫자면 해당 카테고리 id/name을 반환합니다.", () => {
    mockUseSearchParams.mockReturnValue({
      get: (key: string) => (key === "category_id" ? "1" : null)
    });

    const { result } = renderHook(() => useProductDetailCategory());

    expect(result.current.currentCategoryId).toBe(1);
    expect(result.current.currentCategory).toBe(CATEGORY[1] ?? "전체");
  });

  it("query(category_id)가 없으면 0(전체)을 반환합니다.", () => {
    mockUseSearchParams.mockReturnValue({
      get: () => null
    });

    const { result } = renderHook(() => useProductDetailCategory());

    expect(result.current.currentCategoryId).toBe(0);
    expect(result.current.currentCategory).toBe(CATEGORY[0] ?? "전체");
  });

  it("query(category_id)가 숫자가 아니면 0(전체)을 반환합니다.", () => {
    mockUseSearchParams.mockReturnValue({
      get: () => "abc"
    });

    const { result } = renderHook(() => useProductDetailCategory());

    expect(result.current.currentCategoryId).toBe(0);
    expect(result.current.currentCategory).toBe(CATEGORY[0] ?? "전체");
  });

  it("query(category_id)가 범위를 벗어나면 0(전체)을 반환합니다.", () => {
    mockUseSearchParams.mockReturnValue({
      get: () => String(CATEGORY.length + 10)
    });

    const { result } = renderHook(() => useProductDetailCategory());

    expect(result.current.currentCategoryId).toBe(0);
    expect(result.current.currentCategory).toBe(CATEGORY[0] ?? "전체");
  });

  it("query(category_id)가 음수면 0(전체)을 반환합니다.", () => {
    mockUseSearchParams.mockReturnValue({
      get: () => "-1"
    });

    const { result } = renderHook(() => useProductDetailCategory());

    expect(result.current.currentCategoryId).toBe(0);
    expect(result.current.currentCategory).toBe(CATEGORY[0] ?? "전체");
  });
});
