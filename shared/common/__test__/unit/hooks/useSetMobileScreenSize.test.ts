import { renderHook } from "@testing-library/react";
import { useSetMobileScreenSize } from "@/shared/common/hooks/useSetMobileScreenSize";

describe("useSetMobileScreenSize 훅 테스트", () => {
  const setPropertyMock = jest.fn();

  beforeEach(() => {
    // document.documentElement.style.setProperty를 모킹
    Object.defineProperty(document.documentElement, "style", {
      value: {
        setProperty: setPropertyMock
      },
      writable: true
    });

    setPropertyMock.mockClear();
  });

  it("처음 렌더링 시 --vh CSS 변수를 설정해야 합니다.", () => {
    renderHook(() => useSetMobileScreenSize());

    // setProperty가 호출되었는지 확인
    expect(setPropertyMock).toHaveBeenCalledWith(
      "--vh",
      `${window.innerHeight * 0.01}px`
    );
  });

  it("resize 이벤트 발생 시 --vh CSS 변수를 다시 설정해야 합니다.", () => {
    renderHook(() => useSetMobileScreenSize());

    // resize 이벤트를 트리거
    window.innerHeight = 800; // 예: 높이 변경
    window.dispatchEvent(new Event("resize"));

    expect(setPropertyMock).toHaveBeenLastCalledWith("--vh", "8px");
  });

  it("언마운트 시 resize 이벤트 리스너를 제거해야 합니다.", () => {
    const addEventListenerSpy = jest.spyOn(window, "addEventListener");
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

    const { unmount } = renderHook(() => useSetMobileScreenSize());

    // 언마운트 실행
    unmount();

    // removeEventListener가 호출되었는지 확인
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function)
    );

    // 클린업
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });
});
