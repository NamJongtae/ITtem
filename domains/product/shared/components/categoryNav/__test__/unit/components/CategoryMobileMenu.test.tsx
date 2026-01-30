import { render, screen } from "@testing-library/react";
import CategoryMobileMenu from "../../../../../domains/product/shared/components/categoryNav/CategoryMobileMenu";
import useMobileCategory from "@/shared/layout/hooks/useMobileCategory";
import CategoryMobileBtn from "@/domains/product/shared/components/categoryNav/CategoryMobileBtn";
import CategoryMobileList from "@/domains/product/shared/components/categoryNav/CategoryMobileList";

jest.mock("@/shared/layout/hooks/useMobileCategory");
jest.mock("../../../components/CategoryMobileBtn", () => ({
  __esModule: true,
  default: jest.fn(() => (
    <div data-testid="mock-category-mobile-btn">Mocked Btn</div>
  ))
}));
jest.mock("../../../components/CategoryMobileList", () => ({
  __esModule: true,
  default: jest.fn(() => (
    <div data-testid="mock-category-mobile-list">Mocked List</div>
  ))
}));

describe("CategoryMobileMenu 컴포넌트 테스트", () => {
  const mockCategoryMobileBtn = CategoryMobileBtn as unknown as jest.Mock;
  const mockCategoryMobileList = CategoryMobileList as unknown as jest.Mock;
  const mockUseMobileCategory = useMobileCategory as jest.Mock;
  const mockToggleMenu = jest.fn();
  const mockHandleSelectMenu = jest.fn();
  const mockMenuRef = { current: null };

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseMobileCategory.mockReturnValue({
      isOpenMenu: true,
      toggleMenu: mockToggleMenu,
      handleSelectMenu: mockHandleSelectMenu,
      menuRef: mockMenuRef
    });
  });

  it("CategoryMobileBtn과 CategoryMobileList이 렌더링됩니다.", () => {
    render(<CategoryMobileMenu currentCategory="전체" />);
    expect(screen.getByTestId("mock-category-mobile-btn")).toBeInTheDocument();
    expect(screen.getByTestId("mock-category-mobile-list")).toBeInTheDocument();
  });

  it("CategoryMobileBtn과 CategoryMobileList에 props가 전달되는지 확인합니다.", () => {
    render(<CategoryMobileMenu currentCategory="전체" />);
    expect(mockCategoryMobileBtn).toHaveBeenCalledWith(
      {
        currentCategory: "전체",
        isOpenCategory: true,
        toggleCategory: mockToggleMenu
      },
      undefined
    );
    expect(mockCategoryMobileList).toHaveBeenCalledWith(
      {
        currentCategory: "전체",
        isOpenCategory: true,
        toggleMenu: mockToggleMenu,
        handleSelectCategory: mockHandleSelectMenu,
        ref: mockMenuRef
      },
      undefined
    );
  });
});
