import { renderHook } from "@testing-library/react";
import useCurrentCategory from "@/shared/category/hooks/useCurrentCategory";
import { useSearchParams } from "next/navigation";
import { CATEGORY } from "@/domains/product/shared/constants/constants";

jest.mock("next/navigation");

describe("useCurrentCategory 훅 테스트", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("유효한 카테고리인 경우 해당 카테고리를 반환해야 합니다.", () => {
    const validCategory = CATEGORY[0];
    const mockSearchParams = {
      get: jest.fn(() => validCategory)
    };
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);

    const { result } = renderHook(() => useCurrentCategory());

    expect(result.current.currentCategory).toBe(validCategory);
  });

  it("유효하지 않은 카테고리인 경우 '전체'를 반환해야 합니다.", () => {
    const mockSearchParams = {
      get: jest.fn(() => "없는 카테고리")
    };
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);

    const { result } = renderHook(() => useCurrentCategory());

    expect(result.current.currentCategory).toBe("전체");
  });

  it("카테고리 값이 없는 경우 '전체'를 반환해야 함", () => {
    const mockSearchParams = {
      get: jest.fn(() => null)
    };
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);

    const { result } = renderHook(() => useCurrentCategory());

    expect(result.current.currentCategory).toBe("전체");
  });
});
