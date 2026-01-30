import { render, screen, fireEvent } from "@testing-library/react";
import CategoryMobileBtn from "../../../../../domains/product/shared/components/categoryNav/CategoryMobileBtn";
import { escKeyClose } from "@/shared/common/utils/escKeyClose";

jest.mock("@/shared/common/utils/escKeyClose");

describe("CategoryMobileBtn 컴포넌트 테스트", () => {
  const mockEscKeyClose = jest.mocked(escKeyClose);
  const mockToggleCategory = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockEscKeyClose.mockImplementation(({ event, closeCb }) => {
      event.preventDefault();
      closeCb();
    });
  });

  it("currentCategory 텍스트를 렌더링해야 합니다.", () => {
    render(
      <CategoryMobileBtn
        currentCategory="전자기기"
        isOpenCategory={false}
        toggleCategory={mockToggleCategory}
      />
    );

    expect(screen.getByRole("button")).toHaveTextContent("전자기기");
  });

  it("버튼 클릭 시 toggleCategory 콜백이 호출되어야 합니다.", () => {
    render(
      <CategoryMobileBtn
        currentCategory="전자기기"
        isOpenCategory={false}
        toggleCategory={mockToggleCategory}
      />
    );

    fireEvent.click(screen.getByRole("button"));
    expect(mockToggleCategory).toHaveBeenCalledTimes(1);
  });

  it("ESC 키를 눌렀을 때 escKeyClose 유틸이 호출되어야 합니다.", () => {
    render(
      <CategoryMobileBtn
        currentCategory="전자기기"
        isOpenCategory={false}
        toggleCategory={mockToggleCategory}
      />
    );

    fireEvent.keyDown(screen.getByRole("button"), { key: "Escape" });
    expect(escKeyClose).toHaveBeenCalledWith({
      event: expect.any(Object),
      closeCb: mockToggleCategory
    });
  });

  it("isOpenCategory가 true일 때 화살표가 회전되어야 합니다.", () => {
    render(
      <CategoryMobileBtn
        currentCategory="전자기기"
        isOpenCategory={true}
        toggleCategory={mockToggleCategory}
      />
    );

    const image = screen.getByAltText("화살표");
    expect(image).toHaveClass("rotate-180");
  });

  it("isOpenCategory가 false일 때 화살표가 회전되지 않아야 합니다.", () => {
    render(
      <CategoryMobileBtn
        currentCategory="전자기기"
        isOpenCategory={false}
        toggleCategory={mockToggleCategory}
      />
    );

    const image = screen.getByAltText("화살표");
    expect(image).not.toHaveClass("rotate-180");
  });
});
