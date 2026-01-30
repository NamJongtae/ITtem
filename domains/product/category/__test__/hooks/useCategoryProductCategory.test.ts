import { renderHook } from "@testing-library/react";
import { useCategoryProductCategory } from "../../hooks/useCategoryProductCategory";
import { CATEGORY } from "@/domains/product/shared/constants/constants";
import { useParams } from "next/navigation";

jest.mock("next/navigation", () => ({
  useParams: jest.fn()
}));

describe("useCategoryProductCategory 훅 테스트", () => {
  const mockUseParams = useParams as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("params.categoryId가 유효한 숫자면 해당 카테고리 id/name을 반환합니다.", () => {
    mockUseParams.mockReturnValue({ categoryId: "1" });

    const { result } = renderHook(() => useCategoryProductCategory());

    expect(result.current.currentCategoryId).toBe(1);
    expect(result.current.currentCategory).toBe(CATEGORY[1] ?? "전체");
  });

  it("params.categoryId가 없으면 0(전체)을 반환합니다.", () => {
    mockUseParams.mockReturnValue({});

    const { result } = renderHook(() => useCategoryProductCategory());

    expect(result.current.currentCategoryId).toBe(0);
    expect(result.current.currentCategory).toBe(CATEGORY[0] ?? "전체");
  });

  it("params.categoryId가 숫자가 아니면 0(전체)을 반환합니다.", () => {
    mockUseParams.mockReturnValue({ categoryId: "abc" });

    const { result } = renderHook(() => useCategoryProductCategory());

    expect(result.current.currentCategoryId).toBe(0);
    expect(result.current.currentCategory).toBe(CATEGORY[0] ?? "전체");
  });

  it("params.categoryId가 범위를 벗어나면 0(전체)을 반환합니다.", () => {
    mockUseParams.mockReturnValue({ categoryId: String(CATEGORY.length + 10) });

    const { result } = renderHook(() => useCategoryProductCategory());

    expect(result.current.currentCategoryId).toBe(0);
    expect(result.current.currentCategory).toBe(CATEGORY[0] ?? "전체");
  });

  it("params.categoryId가 음수면 0(전체)을 반환합니다.", () => {
    mockUseParams.mockReturnValue({ categoryId: "-1" });

    const { result } = renderHook(() => useCategoryProductCategory());

    expect(result.current.currentCategoryId).toBe(0);
    expect(result.current.currentCategory).toBe(CATEGORY[0] ?? "전체");
  });
});
