// optimizationTabFocus.test.tsx
import React, { useRef } from "react";
import { render, fireEvent } from "@testing-library/react";
import { optimizationTabFocus } from "@/shared/common/utils/optimizationTabFocus";

const TestComponent = () => {
  const firstRef = useRef<HTMLButtonElement>(null);
  const lastRef = useRef<HTMLButtonElement>(null);

  return (
    <div>
      <div>외부 요소</div>

      <div role="menu" aria-label="TestComponent Menu">
        <button
          ref={firstRef}
          onKeyDown={(e) =>
            optimizationTabFocus({
              event: e,
              previousTarget: lastRef.current,
              nextTarget: firstRef.current
            })
          }
        >
          메뉴 항목 1
        </button>
        <button>메뉴 항목 2</button>
        <button>메뉴 항목 3</button>
        <button>메뉴 항목 4</button>
        <button
          ref={lastRef}
          onKeyDown={(e) =>
            optimizationTabFocus({
              event: e,
              previousTarget: lastRef.current,
              nextTarget: firstRef.current
            })
          }
        >
          메뉴 항목 5
        </button>
      </div>
    </div>
  );
};

describe("optimizationTabFocus 테스트", () => {
  it("Shift+Tab 시 첫 번째 항목에서 다섯 번째 항목으로 순환합니다.", () => {
    const { getByText } = render(<TestComponent />);
    const first = getByText("메뉴 항목 1");
    const last = getByText("메뉴 항목 5");

    first.focus();
    fireEvent.keyDown(first, { key: "Tab", keyCode: 9, shiftKey: true });

    expect(document.activeElement).toBe(last);
  });

  it("Tab 시 마지막 항목에서 첫 번째 항목으로 순환합니다.", () => {
    const { getByText } = render(<TestComponent />);
    const first = getByText("메뉴 항목 1");
    const last = getByText("메뉴 항목 5");

    last.focus();
    fireEvent.keyDown(last, { key: "Tab", keyCode: 9 });

    expect(document.activeElement).toBe(first);
  });

  it("외부 버튼으로 포커스가 나가지 않습니다.", () => {
    const { getByText } = render(<TestComponent />);
    const external = getByText("외부 요소");
    const last = getByText("메뉴 항목 5");

    last.focus();
    fireEvent.keyDown(last, { key: "Tab", keyCode: 9 });

    expect(document.activeElement).not.toBe(external);
  });
});
