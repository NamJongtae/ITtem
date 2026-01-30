import { renderHook } from "@testing-library/react";
import useCategoryList from "@/shared/category/hooks/useCategoryList";
import { usePathname, useSearchParams } from "next/navigation";

jest.mock("next/navigation");

describe("useCategoryList 훅 테스트", () => {
  it("pathname과 keyword를 올바르게 반환해야 합니다.", () => {
    (usePathname as jest.Mock).mockReturnValue("/product?keyword=shoes");
    const mockSearchParams = {
      get: jest.fn((key: string) => {
        if (key === "keyword") return "shoes";
        return null;
      })
    };
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);

    const { result } = renderHook(() => useCategoryList());

    expect(result.current.pathname).toBe("/product?keyword=shoes");
    expect(result.current.keyword).toBe("shoes");
  });

  it("keyword가 없는 경우 null을 반환해야 합니다.", () => {
    (usePathname as jest.Mock).mockReturnValue("/product");
    const mockSearchParams = {
      get: jest.fn(() => null)
    };
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);

    const { result } = renderHook(() => useCategoryList());

    expect(result.current.pathname).toBe("/product");
    expect(result.current.keyword).toBeNull();
  });
});
