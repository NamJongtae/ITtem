import { renderHook, act } from "@testing-library/react";
import useDropdownMenu from "@/shared/common/hooks/useDropDownMenu";

jest.useFakeTimers();

describe("useDropdownMenu 훅 테스트", () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it("openMenu 호출 시 메뉴가 열려야 합니다.", () => {
    const { result } = renderHook(() => useDropdownMenu());

    act(() => {
      result.current.openMenu();
    });

    expect(result.current.isOpenMenu).toBe(true);
  });

  it("closeMenu 호출 시 메뉴가 닫혀야 합니다.", () => {
    const { result } = renderHook(() => useDropdownMenu());

    act(() => {
      result.current.closeMenu();
    });

    expect(result.current.isOpenMenu).toBe(false);
  });

  it("toggleMenu는 메뉴 상태를 전환해야 합니다.", () => {
    const { result } = renderHook(() => useDropdownMenu());

    // 메뉴 열기
    act(() => {
      result.current.toggleMenu();
    });
    expect(result.current.isOpenMenu).toBe(true);

    // 메뉴 닫기
    const fakeUl = document.createElement("ul");
    fakeUl.classList.add("animate-entering");
    result.current.menuRef.current = fakeUl;

    act(() => {
      result.current.toggleMenu();
    });

    // 애니메이션 클래스 확인
    expect(fakeUl.classList.contains("animate-entering")).toBe(false);
    expect(fakeUl.classList.contains("animate-leaving")).toBe(true);

    // 타이머로 닫힘 확인
    act(() => {
      jest.advanceTimersByTime(180);
    });
    expect(result.current.isOpenMenu).toBe(false);
  });

  it("외부 클릭 시 메뉴가 닫혀야 합니다.", () => {
    const { result } = renderHook(() => useDropdownMenu());

    const menuElement = document.createElement("ul");
    result.current.menuRef.current = menuElement;

    document.body.appendChild(menuElement);

    act(() => {
      result.current.openMenu();
    });
    expect(result.current.isOpenMenu).toBe(true);

    const outsideElement = document.createElement("div");
    document.body.appendChild(outsideElement);

    act(() => {
      outsideElement.dispatchEvent(
        new MouseEvent("mousedown", { bubbles: true })
      );
    });

    act(() => {
      jest.advanceTimersByTime(180);
    });

    expect(result.current.isOpenMenu).toBe(false);
  });

  it("unmount 시 타이머가 clear 되어야 합니다.", () => {
    const spy = jest.spyOn(global, "clearTimeout");
    const { result, unmount } = renderHook(() => useDropdownMenu());

    const fakeUl = document.createElement("ul");
    result.current.menuRef.current = fakeUl;

    act(() => {
      result.current.openMenu(); // 열기
    });

    act(() => {
      result.current.toggleMenu();
    });

    unmount(); // 언마운트 시 clearTimeout 실행

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
