import { act, renderHook } from "@testing-library/react";
import useNavCategory from "@/shared/layout/hooks/useNavCategory";
import { useSearchParams, usePathname } from "next/navigation";

jest.mock("next/navigation");

describe("useNavCategory 훅 테스트", () => {
  const mockPathname = "/products";

  beforeEach(() => {
    jest.clearAllMocks();
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams("category=신발")
    );
    (usePathname as jest.Mock).mockReturnValue(mockPathname);
  });

  it("기본 상태는 isOpenCategory가 false여야 합니다.", () => {
    const { result } = renderHook(() => useNavCategory());
    expect(result.current.isOpenCategory).toBe(false);
  });

  it("toggleCategory는 NavCategory를 열고 닫을 수 있어야 합니다.", () => {
    const { result } = renderHook(() => useNavCategory());

    act(() => {
      result.current.toggleCategory();
    });
    expect(result.current.isOpenCategory).toBe(true);

    act(() => {
      result.current.toggleCategory();
    });
    expect(result.current.isOpenCategory).toBe(false);
  });

  it("pathname 또는 category가 바뀌면 자동으로 NavCategory가 닫혀야합니다.", () => {
    const { result, rerender } = renderHook(() => useNavCategory());

    act(() => {
      result.current.toggleCategory(); // 열기
    });
    expect(result.current.isOpenCategory).toBe(true);

    // pathname 변경 트리거
    (usePathname as jest.Mock).mockReturnValue("/changed-path");
    rerender();

    expect(result.current.isOpenCategory).toBe(false);
  });

  it("외부 클릭 시 NavCategory는 닫혀야 합니다.", () => {
    const { result } = renderHook(() => useNavCategory());

    // 카테고리 메뉴 및 버튼 dom 요소 설정
    const categoryDiv = document.createElement("div");
    const button = document.createElement("button");
    document.body.appendChild(categoryDiv);
    document.body.appendChild(button);

    // ref 설정
    result.current.categoryRef.current = categoryDiv;
    result.current.buttonRef.current = button;

    // 열기
    act(() => {
      result.current.toggleCategory();
    });
    expect(result.current.isOpenCategory).toBe(true);

    // 외부 클릭 이벤트
    const clickEvent = new MouseEvent("click", { bubbles: true });
    Object.defineProperty(clickEvent, "target", {
      value: document.createElement("div")
    });

    act(() => {
      document.dispatchEvent(clickEvent);
    });

    expect(result.current.isOpenCategory).toBe(false);
  });

  it("카테고리 요소 또는 버튼 내부 클릭 시 NavCategory는 닫히지 않아야 합니다.", () => {
    const { result } = renderHook(() => useNavCategory());

    const categoryDiv = document.createElement("div");
    const button = document.createElement("button");

    result.current.categoryRef.current = categoryDiv;
    result.current.buttonRef.current = button;

    act(() => {
      result.current.toggleCategory(); // 열기
    });
    expect(result.current.isOpenCategory).toBe(true);

    const insideClick = new MouseEvent("click", { bubbles: true });
    Object.defineProperty(insideClick, "target", {
      value: categoryDiv
    });

    act(() => {
      document.dispatchEvent(insideClick);
    });

    expect(result.current.isOpenCategory).toBe(true); // 닫히지 않아야 함
  });
});
