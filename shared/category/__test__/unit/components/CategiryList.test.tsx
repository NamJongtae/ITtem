import { render, screen } from "@testing-library/react";
import CategoryList from "../../../components/CategoryList";
import { CATEGORY } from "@/domains/product/shared/constants/constants";
import useCategoryList from "../../../hooks/useCategoryList";

jest.mock("../../../hooks/useCategoryList");

describe("CategoryList 컴포넌트 테스트", () => {
  const pathname = "/products";
  const mockUseCategoryList = jest.mocked(useCategoryList);

  beforeEach(() => {
    mockUseCategoryList.mockReturnValue({
      pathname: "/products",
      keyword: "노트북"
    });
  });

  it("모든 카테고리 링크를 렌더링해야 합니다.", () => {
    render(<CategoryList currentCategory="전체" />);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(CATEGORY.length);

    CATEGORY.forEach((category) => {
      expect(screen.getByRole("link", { name: category })).toBeInTheDocument();
    });
  });

  it("currentCategory에 해당하는 항목에 활성화 스타일을 적용해야 합니다.", () => {
    render(<CategoryList currentCategory="전자기기" />);

    const activeItem = screen.getByRole("link", { name: "전자기기" });
    expect(activeItem.parentElement).toHaveClass("bg-gray-700");
    expect(activeItem.parentElement).toHaveClass("text-white");
  });

  it("카테고리가 '전체'이고 keyword가 있을 때 올바른 링크를 생성해야 합니다.", () => {
    mockUseCategoryList.mockReturnValue({
      pathname,
      keyword: "노트북"
    });

    render(<CategoryList currentCategory="전체" />);
    const 전체Link = screen.getByRole("link", { name: "전체" });
    expect(전체Link).toHaveAttribute("href", "/products?keyword=노트북");
  });

  it("카테고리가 '전체'이고 keyword가 없을 때 올바른 링크를 생성해야 합니다.", () => {
    mockUseCategoryList.mockReturnValue({
      pathname,
      keyword: ""
    });

    render(<CategoryList currentCategory="전체" />);
    const Link = screen.getByRole("link", { name: "전체" });
    expect(Link).toHaveAttribute("href", "/products");
  });

  it("카테고리가 '전자기기'이고 keyword가 있을 때 올바른 링크를 생성해야 합니다.", () => {
    mockUseCategoryList.mockReturnValue({
      pathname,
      keyword: "노트북"
    });

    render(<CategoryList currentCategory="전자기기" />);
    const Link = screen.getByRole("link", { name: "전자기기" });
    expect(Link).toHaveAttribute(
      "href",
      "/products?keyword=노트북&category=전자기기"
    );
  });

  it("카테고리가 '전자기기'이고 keyword가 없을 때 올바른 링크를 생성해야 합니다.", () => {
    mockUseCategoryList.mockReturnValue({
      pathname,
      keyword: ""
    });

    render(<CategoryList currentCategory="전자기기" />);
    const Link = screen.getByRole("link", { name: "전자기기" });
    expect(Link).toHaveAttribute("href", "/products?category=전자기기");
  });
});
