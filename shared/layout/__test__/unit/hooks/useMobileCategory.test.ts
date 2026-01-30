import { renderHook } from "@testing-library/react";
import useMobileCategory from "@/shared/layout/hooks/useMobileCategory";
import useDropdownMenu from "@/shared/common/hooks/useDropDownMenu";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn()
}));
jest.mock("@/shared/common/hooks/useDropDownMenu");

describe("useMobileCategory 훅 테스트", () => {
  const mockPush = jest.fn();
  const mockCloseMenu = jest.fn();
  const mockToggleMenu = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    (useDropdownMenu as jest.Mock).mockReturnValue({
      isOpenMenu: false,
      toggleMenu: mockToggleMenu,
      closeMenu: mockCloseMenu,
      menuRef: { current: null }
    });
  });

  it("handleSelectMenu 호출 시 closeMenu를 실행하고 makeHref(id)로 이동합니다.", () => {
    const makeHref = jest.fn((id: number) => `/product/categories/${id}`);

    const { result } = renderHook(() => useMobileCategory(makeHref));

    result.current.handleSelectMenu(3);

    expect(mockCloseMenu).toHaveBeenCalledTimes(1);
    expect(makeHref).toHaveBeenCalledWith(3);
    expect(mockPush).toHaveBeenCalledWith("/product/categories/3");
  });

  it("toggleMenu/isOpenMenu/menuRef는 useDropdownMenu 값을 그대로 반환합니다.", () => {
    const makeHref = (id: number) => `/product/categories/${id}`;

    const { result } = renderHook(() => useMobileCategory(makeHref));

    expect(result.current.isOpenMenu).toBe(false);
    expect(result.current.toggleMenu).toBe(mockToggleMenu);
    expect(result.current.menuRef).toEqual({ current: null });
  });

  it("handleSelectMenu는 어떤 id가 와도 makeHref 결과로 push합니다.", () => {
    const makeHref = jest.fn(
      (id: number) => `/product/search?category_id=${id}`
    );

    const { result } = renderHook(() => useMobileCategory(makeHref));

    result.current.handleSelectMenu(0);
    result.current.handleSelectMenu(999);

    expect(mockCloseMenu).toHaveBeenCalledTimes(2);
    expect(makeHref).toHaveBeenNthCalledWith(1, 0);
    expect(makeHref).toHaveBeenNthCalledWith(2, 999);
    expect(mockPush).toHaveBeenNthCalledWith(
      1,
      "/product/search?category_id=0"
    );
    expect(mockPush).toHaveBeenNthCalledWith(
      2,
      "/product/search?category_id=999"
    );
  });
});
