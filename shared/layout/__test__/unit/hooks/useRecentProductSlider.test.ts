import { renderHook, act } from "@testing-library/react";
import useRecentProductSlider from "@/shared/layout/hooks/useRecentProductSlider";
import { RecentProductData } from "@/shared/layout/types/layoutTypes";

describe("useRecentProductSlider 훅 테스트", () => {
  const mockData: RecentProductData[] = [
    {
      productId: "product1",
      productName: "상품1",
      productImg: "https://storage.com/product1.png"
    },
    {
      productId: "product2",
      productName: "상품2",
      productImg: "https://storage.com/product2.png"
    },
    {
      productId: "product3",
      productName: "상품3",
      productImg: "https://storage.com/product3.png"
    }
  ];

  it("초기 상태는 page가 0이고 max는 recentProduct의 길이여야 합니다", () => {
    const { result } = renderHook(() => useRecentProductSlider(mockData));
    expect(result.current.page).toBe(0);
    expect(result.current.max).toBe(3);
  });

  it("handleClickNext를 호출하면 page가 1 증가하고 다음 transform 스타일이 적용됩니다.", () => {
    const { result } = renderHook(() => useRecentProductSlider(mockData));
    const mockElement = {
      style: { transform: "" }
    } as unknown as HTMLUListElement;

    result.current.sliderRef.current = mockElement;

    act(() => {
      result.current.handleClickNext();
    });

    expect(result.current.page).toBe(1);
    expect(mockElement.style.transform).toBe("translateX(-108px)");
  });

  it("handleClickPrev를 호출하면 page가 1 감소하고 이전 transform 스타일이 적용됩니다.", () => {
    const { result } = renderHook(() => useRecentProductSlider(mockData));
    const mockElement = {
      style: { transform: "" }
    } as unknown as HTMLUListElement;

    result.current.sliderRef.current = mockElement;

    // 먼저 page를 1로 만들어주고 테스트
    act(() => {
      result.current.handleClickNext();
    });

    act(() => {
      result.current.handleClickPrev();
    });

    expect(result.current.page).toBe(0);
    expect(mockElement.style.transform).toBe("translateX(-0px)");
  });

  it("sliderRef가 null이면 page가 변하지 않고, transform이 호출되지 않아야 합니다.", () => {
    const { result } = renderHook(() => useRecentProductSlider(mockData));   const mockElement = {
      style: { transform: "" }
    } as unknown as HTMLUListElement;

    act(() => {
      result.current.handleClickNext();
    });

    expect(result.current.page).toBe(0);
    expect(mockElement.style.transform).not.toBe("translateX(-108px)");
  });
});
