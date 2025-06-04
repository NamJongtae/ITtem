import { renderHook } from "@testing-library/react";
import useMobileCategoryList from "@/shared/layout/hooks/useMobileCategoryList";
import { CATEGORY } from "@/domains/product/shared/constants/constants";
import { optimizationTabFocus } from "@/shared/common/utils/optimizationTabFocus";

jest.mock("@/shared/common/utils/optimizationTabFocus", () => ({
  optimizationTabFocus: jest.fn()
}));

describe("useMobileCategoryList 훅 테스트", () => {
  const mockCategory = CATEGORY[0];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("setCategoryClassName: 현재 카테고리와 선택한 카테고리가 일치하면 active 클래스명을 반환합니다.", () => {
    const { result } = renderHook(() =>
      useMobileCategoryList({ currentCategory: mockCategory })
    );

    const activeClassName = result.current.setCategoryClassName(mockCategory);

    expect(activeClassName).toContain("bg-gray-700");
    expect(activeClassName).toContain("text-white");
    expect(activeClassName).toContain(
      "betterhover:hover:text-black betterhover:hover:bg-gray-200"
    );
  });

  it("setCategoryClassName: 현재 카테고리와 선택한 카테고리가 일치하지 않으면 active 클래스명을 반환하지 않습니다.", () => {
    const { result } = renderHook(() =>
      useMobileCategoryList({ currentCategory: mockCategory })
    );

    const notActiveClassName = result.current.setCategoryClassName(CATEGORY[1]);

    expect(notActiveClassName).not.toContain("bg-gray-700");
    expect(notActiveClassName).not.toContain("text-white");
    expect(notActiveClassName).not.toContain(
      "betterhover:hover:text-black betterhover:hover:bg-gray-200"
    );
  });

  it("setCategoryBtnRef: 인덱스에 따라 올바른 ref를 반환합니다.", () => {
    const { result } = renderHook(() =>
      useMobileCategoryList({ currentCategory: CATEGORY[0] })
    );

    const firstRef = result.current.setCategoryBtnRef(0);
    const lastRef = result.current.setCategoryBtnRef(CATEGORY.length - 1);
    const lastPrevLastRef = result.current.setCategoryBtnRef(
      CATEGORY.length - 2
    );

    expect(firstRef).toBeDefined();
    expect(lastRef).toBeDefined();
    expect(lastPrevLastRef).toBeDefined();

    // 리턴된 ref 객체가 useRef에서 반환된 것인지 확인
    expect(result.current.setCategoryBtnRef(0)).toBe(firstRef);
    expect(result.current.setCategoryBtnRef(CATEGORY.length - 1)).toBe(lastRef);
    expect(result.current.setCategoryBtnRef(CATEGORY.length - 2)).toBe(
      lastPrevLastRef
    );
  });

  it("categoryOnKeyDown: 첫 인덱스에서 optimizationTabFocus 호출됩니다.", () => {
    const { result } = renderHook(() =>
      useMobileCategoryList({ currentCategory: CATEGORY[0] })
    );

    const fakeEvent = {
      key: "Tab",
      preventDefault: jest.fn()
    } as unknown as React.KeyboardEvent<HTMLElement>;

    result.current.categoryOnKeyDown(fakeEvent, 0);

    expect(optimizationTabFocus).toHaveBeenCalledWith({
      event: fakeEvent,
      previousTarget: null
    });
  });

  it("categoryOnKeyDown: 마지막 인덱스에서 optimizationTabFocus 호출됩니다.", () => {
    const { result } = renderHook(() =>
      useMobileCategoryList({ currentCategory: CATEGORY[0] })
    );

    const fakeEvent = {
      key: "Tab",
      preventDefault: jest.fn()
    } as unknown as React.KeyboardEvent<HTMLElement>;

    result.current.categoryOnKeyDown(fakeEvent, CATEGORY.length - 1);

    expect(optimizationTabFocus).toHaveBeenCalledWith({
      event: fakeEvent,
      previousTarget: null,
      nextTarget: null
    });
  });
});
