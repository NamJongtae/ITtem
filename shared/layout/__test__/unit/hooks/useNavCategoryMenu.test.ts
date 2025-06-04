
import { CATEGORY } from "@/domains/product/shared/constants/constants";
import useNavCategoryMenu from "@/shared/layout/hooks/useNavCategoryMenu";
import { renderHook } from "@testing-library/react";
import { optimizationTabFocus } from "@/shared/common/utils/optimizationTabFocus";

jest.mock("@/shared/common/utils/optimizationTabFocus", () => ({
  optimizationTabFocus: jest.fn()
}));

describe("useNavCategoryMenu 훅 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("setCategoryLinkRef: 인덱스에 따라 올바른 ref를 반환합니다.", () => {
    const { result } = renderHook(() => useNavCategoryMenu());

    const firstRef = result.current.setCategoryLinkRef(0);
    const lastRef = result.current.setCategoryLinkRef(CATEGORY.length - 1);
    const lastPreviousRef = result.current.setCategoryLinkRef(
      CATEGORY.length - 2
    );

    expect(firstRef).toBeDefined();
    expect(lastRef).toBeDefined();
    expect(lastPreviousRef).toBeDefined();

    expect(result.current.setCategoryLinkRef(0)).toBe(firstRef);
    expect(result.current.setCategoryLinkRef(CATEGORY.length - 1)).toBe(
      lastRef
    );
    expect(result.current.setCategoryLinkRef(CATEGORY.length - 2)).toBe(
      lastPreviousRef
    );
  });

  it("categoryOnKeyDown: 첫 인덱스에서 optimizationTabFocus 호출됩니다.", () => {
    const { result } = renderHook(() => useNavCategoryMenu());

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
    const { result } = renderHook(() => useNavCategoryMenu());

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
