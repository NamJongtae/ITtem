import { renderHook } from "@testing-library/react";
import useMobileCategoryList from "@/shared/layout/hooks/useMobileCategoryList";
import { CATEGORY } from "@/domains/product/shared/constants/constants";
import { optimizationTabFocus } from "@/shared/common/utils/optimizationTabFocus";

jest.mock("@/shared/common/utils/optimizationTabFocus", () => ({
  optimizationTabFocus: jest.fn()
}));

describe("useMobileCategoryList 훅 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("setCategoryClassName: currentCategoryId와 index가 일치하면 active 클래스가 포함됩니다.", () => {
    const currentCategoryId = 0;
    const { result } = renderHook(() =>
      useMobileCategoryList({ currentCategoryId })
    );

    const activeClassName = result.current.setCategoryClassName(0);

    expect(activeClassName).toContain("bg-gray-700");
    expect(activeClassName).toContain("text-white");
    expect(activeClassName).toContain(
      "betterhover:hover:text-black betterhover:hover:bg-gray-200"
    );
  });

  it("setCategoryClassName: currentCategoryId와 index가 다르면 active 클래스가 포함되지 않습니다.", () => {
    const currentCategoryId = 0;
    const { result } = renderHook(() =>
      useMobileCategoryList({ currentCategoryId })
    );

    const notActiveClassName = result.current.setCategoryClassName(1);

    expect(notActiveClassName).not.toContain("bg-gray-700");
    expect(notActiveClassName).not.toContain("text-white");
    expect(notActiveClassName).not.toContain(
      "betterhover:hover:text-black betterhover:hover:bg-gray-200"
    );
  });

  it("setCategoryBtnRef: 인덱스에 따라 올바른 ref를 반환합니다.", () => {
    const { result } = renderHook(() =>
      useMobileCategoryList({ currentCategoryId: 0 })
    );

    const firstRef = result.current.setCategoryBtnRef(0);
    const lastRef = result.current.setCategoryBtnRef(CATEGORY.length - 1);
    const lastPrevRef = result.current.setCategoryBtnRef(CATEGORY.length - 2);
    const midRef = result.current.setCategoryBtnRef(1);

    expect(firstRef).toBeDefined();
    expect(lastRef).toBeDefined();
    expect(lastPrevRef).toBeDefined();
    expect(midRef).toBeNull();

    // 같은 인덱스면 같은 ref 객체가 반환되는지(참조 동일성)
    expect(result.current.setCategoryBtnRef(0)).toBe(firstRef);
    expect(result.current.setCategoryBtnRef(CATEGORY.length - 1)).toBe(lastRef);
    expect(result.current.setCategoryBtnRef(CATEGORY.length - 2)).toBe(
      lastPrevRef
    );
  });

  it("categoryOnKeyDown: 첫 인덱스(0)에서 optimizationTabFocus가 호출됩니다.", () => {
    const { result } = renderHook(() =>
      useMobileCategoryList({ currentCategoryId: 0 })
    );

    const fakeEvent = {
      key: "Tab",
      preventDefault: jest.fn()
    } as unknown as React.KeyboardEvent<HTMLElement>;

    result.current.categoryOnKeyDown(fakeEvent, 0);

    expect(optimizationTabFocus).toHaveBeenCalledWith({
      event: fakeEvent,
      previousTarget: null // lastCategoryRef.current 초기값
    });
  });

  it("categoryOnKeyDown: 마지막 인덱스에서 optimizationTabFocus가 호출됩니다.", () => {
    const { result } = renderHook(() =>
      useMobileCategoryList({ currentCategoryId: 0 })
    );

    const fakeEvent = {
      key: "Tab",
      preventDefault: jest.fn()
    } as unknown as React.KeyboardEvent<HTMLElement>;

    result.current.categoryOnKeyDown(fakeEvent, CATEGORY.length - 1);

    expect(optimizationTabFocus).toHaveBeenCalledWith({
      event: fakeEvent,
      previousTarget: null, // lastCategoryPreviousRef.current 초기값
      nextTarget: null // firstCategoryRef.current 초기값
    });
  });

  it("categoryOnKeyDown: 중간 인덱스에서는 optimizationTabFocus가 호출되지 않습니다.", () => {
    const { result } = renderHook(() =>
      useMobileCategoryList({ currentCategoryId: 0 })
    );

    const fakeEvent = {
      key: "Tab",
      preventDefault: jest.fn()
    } as unknown as React.KeyboardEvent<HTMLElement>;

    result.current.categoryOnKeyDown(fakeEvent, 1);

    expect(optimizationTabFocus).not.toHaveBeenCalled();
  });
});
