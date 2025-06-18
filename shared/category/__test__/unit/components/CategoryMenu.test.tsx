import { render, screen } from "@testing-library/react";
import CategoryMenu from "../../../components/CategoryMenu";
import useCurrentCategory from "../../../hooks/useCurrentCategory";
import CategoryMobileMenu from "../../../components/CategoryMobileMenu";
import CategoryList from "../../../components/CategoryList";

jest.mock("@/shared/category/hooks/useCurrentCategory");
jest.mock("../../../components/CategoryList");
jest.mock("../../../components/CategoryMobileMenu");

describe("CategoryMenu 컴포넌트 테스트", () => {
  const mockUseCurrentCategory = jest.mocked(useCurrentCategory);
  const mockCategoryMobileMenu = jest.mocked(CategoryMobileMenu);
  const mockCategoryList = jest.mocked(CategoryList);

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseCurrentCategory.mockReturnValue({
      currentCategory: "전체"
    });
    mockCategoryMobileMenu.mockImplementation(
      ({ currentCategory }: { currentCategory: string }) => (
        <div data-testid="category-list">CategoryList: {currentCategory}</div>
      )
    );
    mockCategoryList.mockImplementation(
      ({ currentCategory }: { currentCategory: string }) => (
        <div data-testid="category-mobile-menu">
          CategoryMobileMenu: {currentCategory}
        </div>
      )
    );
  });

  it("currentCategory를 자식 컴포넌트에 전달합니다.", () => {
    render(<CategoryMenu />);
    expect(screen.getByTestId("category-list")).toHaveTextContent("전체");
    expect(screen.getByTestId("category-mobile-menu")).toHaveTextContent(
      "전체"
    );
  });

  it("CategoryList가 렌더링되어야 합니다.", () => {
    render(<CategoryMenu />);
    expect(mockCategoryList).toHaveBeenCalled();
  });

  it("CategoryMobileMenu가 렌더링되어야 합니다.", () => {
    render(<CategoryMenu />);
    expect(mockCategoryMobileMenu).toHaveBeenCalled();
  });
});
