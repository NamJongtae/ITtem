import { renderHook, act } from "@testing-library/react";
import useScrollToTop from "@/shared/layout/hooks/useScrollToTop";

describe("useScrollToTop 훅 테스트", () => {
  it("handleClickTop 함수가 window.scrollTo를 호출합니다.", () => {
    window.scrollTo = jest.fn();

    const { result } = renderHook(() => useScrollToTop());

    act(() => {
      result.current.handleClickTop();
    });

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth"
    });
  });
});
