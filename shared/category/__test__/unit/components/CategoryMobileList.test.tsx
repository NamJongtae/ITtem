import { render, screen, fireEvent } from "@testing-library/react";
import CategoryMobileList from "../../../components/CategoryMobileList";
import { CATEGORY } from "@/domains/product/shared/constants/constants";
import { optimizationTabFocus } from "@/shared/common/utils/optimizationTabFocus";
import { escKeyClose } from "@/shared/common/utils/escKeyClose";

jest.mock("@/shared/common/utils/escKeyClose");
jest.mock("@/shared/common/utils/optimizationTabFocus");

describe("CategoryMobileList 컴포넌트 테스트", () => {
  const mockOptimizationTabFocus = jest.mocked(optimizationTabFocus);
  const mockEscKeyClose = jest.mocked(escKeyClose);

  beforeEach(() => {
    jest.clearAllMocks();
    mockEscKeyClose.mockImplementation(({ event, closeCb }) => {
      event.preventDefault();
      closeCb();
    });
  });

  const defaultProps = {
    isOpenCategory: true,
    toggleMenu: jest.fn(),
    handleSelectCategory: jest.fn(),
    currentCategory: "전체"
  };

  it("isOpenCategory가 false면 렌더링되지 않습니다.", () => {
    render(<CategoryMobileList {...defaultProps} isOpenCategory={false} />);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("isOpenCategory가 true면 카테고리 목록이 렌더링된다", () => {
    render(<CategoryMobileList {...defaultProps} />);
    const menu = screen.getByRole("menu");
    expect(menu).toBeInTheDocument();

    CATEGORY.forEach((cat) => {
      expect(screen.getByRole("menuitem", { name: cat })).toBeInTheDocument();
    });
  });

  it("카테고리 버튼 클릭 시 handleSelectCategory가 호출됩니다.", () => {
    render(<CategoryMobileList {...defaultProps} />);
    const button = screen.getByRole("menuitem", { name: CATEGORY[1] });
    fireEvent.click(button);
    expect(defaultProps.handleSelectCategory).toHaveBeenCalled();
  });

  it("선택된 카테고리 버튼에 스타일이 적용됩니다.", () => {
    render(
      <CategoryMobileList {...defaultProps} currentCategory={CATEGORY[2]} />
    );
    const selectedButton = screen.getByRole("menuitem", { name: CATEGORY[2] });
    expect(selectedButton.className).toMatch(/bg-gray-700/);
    expect(selectedButton.className).toMatch(/text-white/);
  });

  it("ESC 키를 누르면 toggleMenu가 호출됩니다.", () => {
    render(<CategoryMobileList {...defaultProps} />);
    const menu = screen.getByRole("menu");
    fireEvent.keyDown(menu, { key: "Escape" });
    expect(defaultProps.toggleMenu).toHaveBeenCalled();
  });

  it("마지막 카테고리 버튼에서 Tab 키를 누르면 optimizationTabFocus가 호출됩니다.", () => {
    render(<CategoryMobileList {...defaultProps} />);
    const lastButton = screen.getByRole("menuitem", {
      name: CATEGORY[CATEGORY.length - 1]
    });
    fireEvent.keyDown(lastButton, { key: "Tab" });
    expect(mockOptimizationTabFocus).toHaveBeenCalled();
  });

  it("첫 번째 카테고리 버튼에서 Shift+Tab 키를 누르면 optimizationTabFocus가 호출됩니다.", () => {
    render(<CategoryMobileList {...defaultProps} />);
    const firstButton = screen.getByRole("menuitem", { name: CATEGORY[0] });
    fireEvent.keyDown(firstButton, { key: "Tab", shiftKey: true });
    expect(mockOptimizationTabFocus).toHaveBeenCalled();
  });
});
