import { render, screen } from "@testing-library/react";
import CategoryMenuUI from "../../../CategoryMenuUI";
import CategoryMobileMenu from "../../../CategoryMobileMenu";
import CategoryList from "../../../CategoryList";

jest.mock("../../../CategoryList", () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="category-list" />)
}));

jest.mock("../../../CategoryMobileMenu", () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="category-mobile-menu" />)
}));

describe("CategoryMenuUI 컴포넌트 테스트", () => {
  const mockCategoryMobileMenu = jest.mocked(CategoryMobileMenu);
  const mockCategoryList = jest.mocked(CategoryList);

  const makeHref = jest.fn((id: number) => `/products/categories/${id}`);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("CategoryList와 CategoryMobileMenu가 렌더링되어야 합니다.", () => {
    render(<CategoryMenuUI currentCategoryId={2} makeHref={makeHref} />);

    expect(screen.getByTestId("category-list")).toBeInTheDocument();
    expect(screen.getByTestId("category-mobile-menu")).toBeInTheDocument();
  });

  it("currentCategoryId와 makeHref를 CategoryList에 전달합니다.", () => {
    const currentCategoryId = 3;

    render(
      <CategoryMenuUI
        currentCategoryId={currentCategoryId}
        makeHref={makeHref}
      />
    );

    expect(mockCategoryList).toHaveBeenCalledWith(
      expect.objectContaining({
        currentCategoryId,
        makeHref
      }),
      undefined // ✅ {} → undefined
    );
  });

  it("currentCategoryId와 makeHref를 CategoryMobileMenu에 전달합니다.", () => {
    const currentCategoryId = 5;

    render(
      <CategoryMenuUI
        currentCategoryId={currentCategoryId}
        makeHref={makeHref}
      />
    );

    expect(mockCategoryMobileMenu).toHaveBeenCalledWith(
      expect.objectContaining({ currentCategoryId, makeHref }),
      undefined
    );
  });
});
