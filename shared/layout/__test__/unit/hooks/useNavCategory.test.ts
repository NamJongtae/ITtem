import { act, renderHook } from "@testing-library/react";
import useNavCategory from "@/shared/layout/hooks/useNavCategory";
import { useSearchParams } from "next/navigation";

jest.mock("next/navigation", () => ({
  __esModule: true,
  useSearchParams: jest.fn()
}));

describe("useNavCategory 훅 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams("category=신발")
    );
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

  it("closeCategory 호출 시 NavCategory는 닫혀야 합니다.", () => {
    const { result } = renderHook(() => useNavCategory());

    act(() => {
      result.current.toggleCategory(); // 열기
    });
    expect(result.current.isOpenCategory).toBe(true);

    act(() => {
      result.current.closeCategory();
    });
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

    // 외부 클릭: categoryDiv/button 둘 다 아닌 요소
    const outside = document.createElement("div");
    document.body.appendChild(outside);

    act(() => {
      outside.click(); // document에 걸린 click 리스너가 받음
    });

    expect(result.current.isOpenCategory).toBe(false);
  });

  it("카테고리 요소 또는 버튼 내부 클릭 시 NavCategory는 닫히지 않아야 합니다.", () => {
    const { result } = renderHook(() => useNavCategory());

    const categoryDiv = document.createElement("div");
    const button = document.createElement("button");
    document.body.appendChild(categoryDiv);
    document.body.appendChild(button);

    result.current.categoryRef.current = categoryDiv;
    result.current.buttonRef.current = button;

    act(() => {
      result.current.toggleCategory(); // 열기
    });
    expect(result.current.isOpenCategory).toBe(true);

    act(() => {
      categoryDiv.click(); // 내부 클릭
    });
    expect(result.current.isOpenCategory).toBe(true);

    act(() => {
      button.click(); // 버튼 클릭
    });
    expect(result.current.isOpenCategory).toBe(true);
  });

  it("currentCategory는 searchParams의 category 값을 반환합니다.", () => {
    const { result } = renderHook(() => useNavCategory());
    expect(result.current.currentCategory).toBe("신발");
  });
});
