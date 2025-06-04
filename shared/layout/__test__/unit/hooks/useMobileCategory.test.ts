import { renderHook } from "@testing-library/react";
import useMobileCategory from "@/shared/layout/hooks/useMobileCategory";
import useDropdownMenu from "@/shared/common/hooks/useDropDownMenu";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

jest.mock("next/navigation");
jest.mock("@/shared/common/hooks/useDropDownMenu");

describe("useMobileCategory 훅 테스트", () => {
  const mockPush = jest.fn();
  const mockCloseMenu = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (usePathname as jest.Mock).mockReturnValue("/products");

    (useDropdownMenu as jest.Mock).mockReturnValue({
      isOpenMenu: false,
      toggleMenu: jest.fn(),
      closeMenu: mockCloseMenu,
      menuRef: { current: null }
    });
  });

  it("keyword가 있고, 특정 카테고리 선택 시 keyword와 category 모두 포함된 URL로 이동합니다.", () => {
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams("keyword=신발")
    );

    const { result } = renderHook(() => useMobileCategory());

    const fakeEvent = {
      currentTarget: {
        getAttribute: jest.fn(() => "의류")
      }
    } as unknown as React.MouseEvent<HTMLButtonElement>;

    result.current.handleSelectMenu(fakeEvent);

    expect(mockCloseMenu).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith(
      "/products?keyword=신발&category=의류"
    );
  });

  it("keyword가 있고, '전체' 카테고리 선택 시 keyword만 포함된 URL로 이동합니다.", () => {
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams("keyword=신발")
    );

    const { result } = renderHook(() => useMobileCategory());

    const fakeEvent = {
      currentTarget: {
        getAttribute: jest.fn(() => "전체")
      }
    } as unknown as React.MouseEvent<HTMLButtonElement>;

    result.current.handleSelectMenu(fakeEvent);

    expect(mockCloseMenu).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith("/products?keyword=신발");
  });

  it("keyword가 없고, 특정 카테고리 선택 시 category만 포함된 URL로 이동합니다.", () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());

    const { result } = renderHook(() => useMobileCategory());

    const fakeEvent = {
      currentTarget: {
        getAttribute: jest.fn(() => "의류")
      }
    } as unknown as React.MouseEvent<HTMLButtonElement>;

    result.current.handleSelectMenu(fakeEvent);

    expect(mockCloseMenu).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith("/products?category=의류");
  });

  it("keyword가 없고, '전체' 선택 시 pathname만 포함된 URL로 이동합니다.", () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());

    const { result } = renderHook(() => useMobileCategory());

    const fakeEvent = {
      currentTarget: {
        getAttribute: jest.fn(() => "전체")
      }
    } as unknown as React.MouseEvent<HTMLButtonElement>;

    result.current.handleSelectMenu(fakeEvent);

    expect(mockCloseMenu).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith("/products");
  });

  it("카테고리 값이 없으면 아무 작업도 하지 않습니다.", () => {
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams("keyword=신발")
    );

    const { result } = renderHook(() => useMobileCategory());

    const fakeEvent = {
      currentTarget: {
        getAttribute: jest.fn(() => null)
      }
    } as unknown as React.MouseEvent<HTMLButtonElement>;

    result.current.handleSelectMenu(fakeEvent);

    expect(mockCloseMenu).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });
});
