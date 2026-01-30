import { render, screen } from "@testing-library/react";
import CategoryNav from "../../../../../domains/product/shared/components/categoryNav/CategoryNav";
import useCurrentCategory from "@/shared/category/hooks/useCurrentCategory";
import { CATEGORY } from "@/domains/product/shared/constants/constants";

jest.mock("@/shared/category/hooks/useCurrentCategory");
jest.mock("@/public/icons/home-icon.svg", () => ({
  __esModule: true,
  default: (props: React.ComponentProps<"svg">) => (
    <svg data-testid="home-icon" {...props} />
  )
}));

describe("CategoryNav 컴포넌트 테스트", () => {
  const mockUseCurrentCategory = useCurrentCategory as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("currentCategory가 CATEGORY에 포함되면 해당 카테고리명을 렌더링합니다.", () => {
    mockUseCurrentCategory.mockReturnValue({ currentCategory: CATEGORY[1] });
    render(<CategoryNav />);
    expect(screen.getByText("의류")).toBeInTheDocument();
  });

  it("currentCategory가 CATEGORY에 없으면 '전체'를 렌더링합니다.", () => {
    mockUseCurrentCategory.mockReturnValue({ currentCategory: "없는카테고리" });
    render(<CategoryNav />);
    expect(screen.getByText("전체")).toBeInTheDocument();
  });

  it("HomeIcon이 렌더링됩니다.", () => {
    mockUseCurrentCategory.mockReturnValue({ currentCategory: CATEGORY[0] });
    render(<CategoryNav />);
    expect(screen.getByTestId("home-icon")).toBeInTheDocument();
  });

  it("className prop이 nav에 정상적으로 전달되어야 합니다.", () => {
    mockUseCurrentCategory.mockReturnValue({ currentCategory: CATEGORY[0] });
    render(<CategoryNav className="test-class" />);
    expect(screen.getByRole("navigation")).toHaveClass("test-class");
  });
});
