import { render, screen, fireEvent } from "@testing-library/react";
import CategoryMobileList from "../../../CategoryMobileList";
import { CATEGORY } from "@/domains/product/shared/constants/constants";
import { optimizationTabFocus } from "@/shared/common/utils/optimizationTabFocus";
import { escKeyClose } from "@/shared/common/utils/escKeyClose";

jest.mock("@/shared/common/utils/escKeyClose", () => ({
  escKeyClose: jest.fn()
}));

jest.mock("@/shared/common/utils/optimizationTabFocus", () => ({
  optimizationTabFocus: jest.fn()
}));

describe("CategoryMobileList 컴포넌트 테스트", () => {
  const mockOptimizationTabFocus = jest.mocked(optimizationTabFocus);
  const mockEscKeyClose = jest.mocked(escKeyClose);

  const defaultProps = {
    isOpenCategory: true,
    toggleMenu: jest.fn(),
    handleSelectCategory: jest.fn(),
    currentCategoryId: 0
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // ESC 처리 유틸이 onKeyDown에서 호출되므로, 테스트에서 keyDown 시 toggleMenu 호출되게 흉내
    mockEscKeyClose.mockImplementation(({ event, closeCb }) => {
      // 실제 구현이 Escape 키일 때만 닫는지 여부는 escKeyClose 유틸 테스트에서 다루고,
      // 여기서는 "escKeyClose가 호출되면 closeCb가 실행될 수 있다" 정도만 검증
      event.preventDefault();
      closeCb();
    });
  });

  it("isOpenCategory가 false면 렌더링되지 않습니다.", () => {
    render(<CategoryMobileList {...defaultProps} isOpenCategory={false} />);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("isOpenCategory가 true면 카테고리 목록이 렌더링됩니다.", () => {
    render(<CategoryMobileList {...defaultProps} />);
    expect(screen.getByRole("menu")).toBeInTheDocument();

    CATEGORY.forEach((cat) => {
      expect(screen.getByRole("menuitem", { name: cat })).toBeInTheDocument();
    });
  });

  it("카테고리 버튼 클릭 시 handleSelectCategory(index)가 호출됩니다.", () => {
    render(<CategoryMobileList {...defaultProps} />);

    const targetIndex = 1;
    const button = screen.getByRole("menuitem", {
      name: CATEGORY[targetIndex]
    });

    fireEvent.click(button);

    expect(defaultProps.handleSelectCategory).toHaveBeenCalledTimes(1);
    expect(defaultProps.handleSelectCategory).toHaveBeenCalledWith(targetIndex);
  });

  it("선택된 카테고리(currentCategoryId) 버튼에 active 스타일이 적용됩니다.", () => {
    const selectedIndex = 2;

    render(
      <CategoryMobileList {...defaultProps} currentCategoryId={selectedIndex} />
    );

    const selectedButton = screen.getByRole("menuitem", {
      name: CATEGORY[selectedIndex]
    });

    expect(selectedButton.className).toContain("bg-gray-700");
    expect(selectedButton.className).toContain("text-white");
  });

  it("선택되지 않은 카테고리 버튼에는 active 스타일이 적용되지 않습니다.", () => {
    const selectedIndex = 2;

    render(
      <CategoryMobileList {...defaultProps} currentCategoryId={selectedIndex} />
    );

    const notSelectedButton = screen.getByRole("menuitem", {
      name: CATEGORY[1]
    });

    expect(notSelectedButton.className).not.toContain("bg-gray-700");
    expect(notSelectedButton.className).not.toContain("text-white");
  });

  it("메뉴에서 keyDown 이벤트 발생 시 escKeyClose가 호출됩니다.", () => {
    render(<CategoryMobileList {...defaultProps} />);
    const menu = screen.getByRole("menu");

    fireEvent.keyDown(menu, { key: "Escape" });

    expect(mockEscKeyClose).toHaveBeenCalledTimes(1);
    expect(defaultProps.toggleMenu).toHaveBeenCalledTimes(1);
  });

  it("마지막 카테고리 버튼에서 keyDown 이벤트 발생 시 optimizationTabFocus가 호출됩니다.", () => {
    render(<CategoryMobileList {...defaultProps} />);

    const lastIndex = CATEGORY.length - 1;
    const lastButton = screen.getByRole("menuitem", {
      name: CATEGORY[lastIndex]
    });

    fireEvent.keyDown(lastButton, { key: "Tab" });

    // categoryOnKeyDown이 마지막 인덱스면 optimizationTabFocus 호출
    expect(mockOptimizationTabFocus).toHaveBeenCalledTimes(1);
  });

  it("첫 번째 카테고리 버튼에서 keyDown 이벤트 발생 시 optimizationTabFocus가 호출됩니다.", () => {
    render(<CategoryMobileList {...defaultProps} />);

    const firstButton = screen.getByRole("menuitem", { name: CATEGORY[0] });

    fireEvent.keyDown(firstButton, { key: "Tab", shiftKey: true });

    // 훅 로직상 index===0이면 optimizationTabFocus 호출
    expect(mockOptimizationTabFocus).toHaveBeenCalledTimes(1);
  });
});
