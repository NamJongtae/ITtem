import { renderHook } from "@testing-library/react";
import { useGetQuerys } from "@/shared/common/hooks/useGetQuerys";
import * as nextNavigation from "next/navigation";

jest.mock("next/navigation");

describe("useGetQuerys 훅 테스트", () => {
  it("여러 개의 key에 대해 쿼리 값을 잘 가져오는지 확인합니다.", () => {
    const mockSearchParams = {
      get: jest.fn((key: string) => {
        const mockValues: Record<string, string> = {
          product: "prodcut1",
          keyword: "가방"
        };
        return mockValues[key] ?? null;
      })
    };

    // mock된 useSearchParams 리턴 설정
    (nextNavigation.useSearchParams as jest.Mock).mockReturnValue(
      mockSearchParams
    );

    // 훅 실행
    const { result } = renderHook(() => useGetQuerys(["product", "keyword"]));

    // 예상 결과 검증
    expect(result.current).toEqual({
      product: "prodcut1",
      keyword: "가방"
    });
  });

  it("문자열 하나만 입력했을 때도 잘 작동하는지 확인합니다.", () => {
    const mockSearchParams = {
      get: jest.fn((key: string) => (key === "product" ? "product1" : null))
    };

    (nextNavigation.useSearchParams as jest.Mock).mockReturnValue(
      mockSearchParams
    );

    const { result } = renderHook(() => useGetQuerys("product"));

    expect(result.current).toEqual({
      product: "product1"
    });
  });

  it("모든 key가 쿼리에 없을 때 빈 객체 반환하는지 확인합니다.", () => {
    const mockSearchParams = {
      get: jest.fn(() => null)
    };

    (nextNavigation.useSearchParams as jest.Mock).mockReturnValue(
      mockSearchParams
    );

    const { result } = renderHook(() => useGetQuerys(["nonexistent"]));

    expect(result.current).toEqual({});
  });
});
