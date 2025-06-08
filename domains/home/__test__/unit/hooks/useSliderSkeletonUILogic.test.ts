import { renderHook, act } from "@testing-library/react";
import useSliderSkeletonUILogic from "@/domains/home/hooks/useSliderSkeletonUILogic";

jest.mock("@/shared/common/hooks/useThrottle", () => ({
  useThrottle: (cb: unknown) => cb
}));

// window.innerWidth를 조작하는 유틸 함수
const setWindowWidth = (width: number) => {
  (window.innerWidth as number) = width;
  window.dispatchEvent(new Event("resize"));
};

describe("useSliderSkeletonUILogic 훅 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("초기값 테스트 - 1200px 이상", () => {
    setWindowWidth(1200);

    const { result } = renderHook(() => useSliderSkeletonUILogic());
    expect(result.current.slidesToShow).toBe(4);
    expect(result.current.gap).toBe(30);
  });

  it("540px 미만일 때 slidesToShow=1, gap=10", () => {
    setWindowWidth(500);

    const { result } = renderHook(() => useSliderSkeletonUILogic());
    expect(result.current.slidesToShow).toBe(1);
    expect(result.current.gap).toBe(10);
  });

  it("768px 미만일 때 slidesToShow=2, gap=20", () => {
    setWindowWidth(600);

    const { result } = renderHook(() => useSliderSkeletonUILogic());
    expect(result.current.slidesToShow).toBe(2);
    expect(result.current.gap).toBe(20);
  });

  it("1024px 미만일 때 slidesToShow=3, gap=30", () => {
    setWindowWidth(800);

    const { result } = renderHook(() => useSliderSkeletonUILogic());
    expect(result.current.slidesToShow).toBe(3);
    expect(result.current.gap).toBe(30);
  });

  it("resize 이벤트로 상태가 변경되는지 확인합니다.", () => {
    const { result } = renderHook(() => useSliderSkeletonUILogic());

    act(() => {
      setWindowWidth(500);
    });

    expect(result.current.slidesToShow).toBe(1);
    expect(result.current.gap).toBe(10);
  });
});
