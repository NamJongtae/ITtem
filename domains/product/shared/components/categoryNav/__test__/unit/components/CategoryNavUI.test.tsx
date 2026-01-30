import { render, screen } from "@testing-library/react";
import CategoryNavUI from "../../../CategoryNavUI";
import { CATEGORY } from "@/domains/product/shared/constants/constants";

jest.mock("@/public/icons/home-icon.svg", () => ({
  __esModule: true,
  default: (props: React.ComponentProps<"svg">) => (
    <svg data-testid="home-icon" {...props} />
  )
}));

describe("CategoryNavUI 컴포넌트 테스트", () => {
  it("currentCategory가 CATEGORY에 포함되면 해당 카테고리명을 렌더링합니다.", () => {
    render(<CategoryNavUI currentCategory={CATEGORY[1]} />);
    expect(screen.getByText("의류")).toBeInTheDocument();
  });

  it("currentCategory가 CATEGORY에 없으면 '전체'를 렌더링합니다.", () => {
    render(<CategoryNavUI currentCategory={"없는카테고리"} />);
    expect(screen.getByText("전체")).toBeInTheDocument();
  });

  it("HomeIcon이 렌더링됩니다.", () => {
    render(<CategoryNavUI currentCategory={CATEGORY[0]} />);
    expect(screen.getByTestId("home-icon")).toBeInTheDocument();
  });

  it("className prop이 nav에 정상적으로 전달되어야 합니다.", () => {
    render(
      <CategoryNavUI currentCategory={CATEGORY[0]} className="test-class" />
    );
    expect(screen.getByRole("navigation")).toHaveClass("test-class");
  });
});
