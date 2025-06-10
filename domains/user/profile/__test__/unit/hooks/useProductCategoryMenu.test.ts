import { act, renderHook } from "@testing-library/react";
import useProductCategoryMenu from "../../../hooks/useProductCategoryMenu";
import useDropdownMenu from "@/shared/common/hooks/useDropDownMenu";
import { CATEGORY } from "@/domains/product/shared/constants/constants";
import { optimizationTabFocus } from "@/shared/common/utils/optimizationTabFocus";
import { ProductCategory } from "@/domains/product/shared/types/productTypes";

jest.mock("@/shared/common/hooks/useDropDownMenu");
jest.mock("@/shared/common/utils/optimizationTabFocus");

describe("useProductCategoryMenu", () => {
  const toggleMenu = jest.fn();
  const closeMenu = jest.fn();
  const menuRef = { current: null };

  const selectCategory = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useDropdownMenu as jest.Mock).mockReturnValue({
      isOpenMenu: true,
      toggleMenu,
      closeMenu,
      menuRef
    });
  });

  it("메뉴 상태와 핸들러들을 반환한다", () => {
    const { result } = renderHook(() =>
      useProductCategoryMenu({ selectCategory })
    );

    expect(result.current.isOpenMenu).toBe(true);
    expect(result.current.toggleMenu).toBe(toggleMenu);
    expect(result.current.closeMenu).toBe(closeMenu);
    expect(result.current.menuRef).toBe(menuRef);
  });

  it("setCategoryBtnRef는 index에 따라 올바른 ref를 반환합니다.", () => {
    const { result } = renderHook(() =>
      useProductCategoryMenu({ selectCategory })
    );

    const first = result.current.setCategoryBtnRef(0);
    const last = result.current.setCategoryBtnRef(CATEGORY.length - 1);
    const prev = result.current.setCategoryBtnRef(CATEGORY.length - 2);
    const middle = result.current.setCategoryBtnRef(2);

    expect(first).toBeDefined();
    expect(last).toBeDefined();
    expect(prev).toBeDefined();

    expect(first).not.toBeNull();
    expect(last).not.toBeNull();
    expect(prev).not.toBeNull();
    expect(middle).toBeNull();
  });

  it("onClickCategory는 selectCategory와 closeMenu를 호출합니다.", () => {
    const { result } = renderHook(() =>
      useProductCategoryMenu({ selectCategory })
    );

    result.current.onClickCategory(ProductCategory.가방지갑);

    expect(selectCategory).toHaveBeenCalledWith(ProductCategory.가방지갑);
    expect(closeMenu).toHaveBeenCalled();
  });

  it("categoryOnKeyDown 호출 시 마지막 index일 경우 optimizationTabFocus를 호출합니다.", () => {
    const event = {
      key: "Tab",
      preventDefault: jest.fn()
    } as unknown as React.KeyboardEvent<HTMLElement>;

    const { result } = renderHook(() =>
      useProductCategoryMenu({ selectCategory })
    );

    const fakePrev = document.createElement("button");
    const fakeyNext = document.createElement("button");

    result.current.lastCategoryPreviousRef.current = fakePrev;
    result.current.firstCategoryRef.current = fakeyNext;

    act(() => {
      result.current.categoryOnKeyDown(event, CATEGORY.length - 1);
    });

    expect(optimizationTabFocus).toHaveBeenCalledWith({
      event,
      previousTarget: fakePrev,
      nextTarget: fakeyNext
    });
  });

  it("categoryOnKeyDown 호출 시 첫 index일 경우 optimizationTabFocus를 호출합니다.", () => {
    const event = {
      key: "Tab",
      preventDefault: jest.fn(),
      shiftKey: true
    } as unknown as React.KeyboardEvent<HTMLElement>;

    const { result } = renderHook(() =>
      useProductCategoryMenu({ selectCategory })
    );

    const fakePrev = document.createElement("button");

    result.current.lastCategoryRef.current = fakePrev;

    act(() => {
      result.current.categoryOnKeyDown(event, 0);
    });

    expect(optimizationTabFocus).toHaveBeenCalledWith({
      event,
      previousTarget: fakePrev
    });
  });
});
