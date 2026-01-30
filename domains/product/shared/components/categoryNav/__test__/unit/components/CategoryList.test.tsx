import { render, screen } from "@testing-library/react";
import CategoryList from "../../../CategoryList";
import { CATEGORY } from "@/domains/product/shared/constants/constants";

describe("CategoryList 컴포넌트 테스트", () => {
  const makeHref = jest.fn((id: number) => `/products/categories/${id}`);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("모든 카테고리 링크를 렌더링해야 합니다.", () => {
    render(<CategoryList currentCategoryId={0} makeHref={makeHref} />);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(CATEGORY.length);

    CATEGORY.forEach((label) => {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    });
  });

  it("각 카테고리에 대해 makeHref(id)가 호출되어야 합니다.", () => {
    render(<CategoryList currentCategoryId={0} makeHref={makeHref} />);

    expect(makeHref).toHaveBeenCalledTimes(CATEGORY.length);
    CATEGORY.forEach((_, id) => {
      expect(makeHref).toHaveBeenCalledWith(id);
    });
  });

  it("makeHref가 반환한 href가 링크에 적용되어야 합니다.", () => {
    render(<CategoryList currentCategoryId={0} makeHref={makeHref} />);

    CATEGORY.forEach((_, id) => {
      const link = screen.getByRole("link", { name: CATEGORY[id] });
      expect(link).toHaveAttribute("href", `/products/categories/${id}`);
    });
  });

  it("currentCategoryId에 해당하는 항목에 활성화 스타일을 적용해야 합니다.", () => {
    const activeId = 2;
    render(<CategoryList currentCategoryId={activeId} makeHref={makeHref} />);

    const activeLink = screen.getByRole("link", { name: CATEGORY[activeId] });
    const li = activeLink.closest("li");

    expect(li).toHaveClass("bg-gray-700");
    expect(li).toHaveClass("text-white");
  });

  it("currentCategoryId가 아닌 항목에는 비활성 스타일이 적용되어야 합니다.", () => {
    const activeId = 2;
    render(<CategoryList currentCategoryId={activeId} makeHref={makeHref} />);

    const notActiveId = (activeId + 1) % CATEGORY.length;
    const link = screen.getByRole("link", { name: CATEGORY[notActiveId] });
    const li = link.closest("li");

    expect(li).toHaveClass("bg-white");
  });
});
