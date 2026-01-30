import { render, screen } from "@testing-library/react";
import CategoryMobileMenu from "../../../CategoryMobileMenu";
import useMobileCategory from "@/shared/layout/hooks/useMobileCategory";
import CategoryMobileBtn from "../../../CategoryMobileBtn";
import CategoryMobileList from "../../../CategoryMobileList";
import { CATEGORY } from "@/domains/product/shared/constants/constants";

jest.mock("@/shared/layout/hooks/useMobileCategory");

jest.mock("../../../CategoryMobileBtn", () => ({
  __esModule: true,
  default: jest.fn(() => (
    <div data-testid="mock-category-mobile-btn">Mocked Btn</div>
  ))
}));

jest.mock("../../../CategoryMobileList", () => ({
  __esModule: true,
  default: jest.fn(() => (
    <div data-testid="mock-category-mobile-list">Mocked List</div>
  ))
}));

describe("CategoryMobileMenu 컴포넌트 테스트", () => {
  const mockCategoryMobileBtn = jest.mocked(CategoryMobileBtn);
  const mockCategoryMobileList = jest.mocked(CategoryMobileList);
  const mockUseMobileCategory = useMobileCategory as jest.Mock;

  const mockToggleMenu = jest.fn();
  const mockHandleSelectMenu = jest.fn();
  const mockMenuRef = { current: null };

  const makeHref = jest.fn((id: number) => `/product/categories/${id}`);

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseMobileCategory.mockReturnValue({
      isOpenMenu: true,
      toggleMenu: mockToggleMenu,
      handleSelectMenu: mockHandleSelectMenu,
      menuRef: mockMenuRef
    });
  });

  it("CategoryMobileBtn과 CategoryMobileList가 렌더링됩니다.", () => {
    render(<CategoryMobileMenu currentCategoryId={0} makeHref={makeHref} />);

    expect(screen.getByTestId("mock-category-mobile-btn")).toBeInTheDocument();
    expect(screen.getByTestId("mock-category-mobile-list")).toBeInTheDocument();
  });

  it("useMobileCategory가 makeHref를 인자로 호출합니다.", () => {
    render(<CategoryMobileMenu currentCategoryId={0} makeHref={makeHref} />);
    expect(mockUseMobileCategory).toHaveBeenCalledWith(makeHref);
  });

  it("CategoryMobileBtn에 currentCategory/isOpenCategory/toggleCategory props가 전달됩니다.", () => {
    const currentCategoryId = 0;
    const expectedLabel = CATEGORY[currentCategoryId] ?? "전체";

    render(
      <CategoryMobileMenu
        currentCategoryId={currentCategoryId}
        makeHref={makeHref}
      />
    );

    expect(mockCategoryMobileBtn).toHaveBeenCalledWith(
      expect.objectContaining({
        currentCategory: expectedLabel,
        isOpenCategory: true,
        toggleCategory: mockToggleMenu
      }),
      undefined
    );
  });

  it("CategoryMobileList에 props가 전달되고 ref는 props.ref로 전달됩니다.", () => {
    const currentCategoryId = 3;

    render(
      <CategoryMobileMenu
        currentCategoryId={currentCategoryId}
        makeHref={makeHref}
      />
    );

    expect(mockCategoryMobileList).toHaveBeenCalledWith(
      expect.objectContaining({
        isOpenCategory: true,
        currentCategoryId,
        toggleMenu: mockToggleMenu,
        handleSelectCategory: mockHandleSelectMenu,
        ref: mockMenuRef
      }),
      undefined
    );
  });
});
