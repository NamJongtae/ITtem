// escKeyClose.test.tsx
import { render, fireEvent } from "@testing-library/react";
import React from "react";
import { escKeyClose } from "@/shared/common/utils/escKeyClose";

const TestComponent = ({ onClose }: { onClose: () => void }) => {
  return (
    <div
      tabIndex={0}
      onKeyDown={(e) => escKeyClose({ event: e, closeCb: onClose })}
    >
      Press ESC
    </div>
  );
};

describe("escKeyClose", () => {
  it("ESC 키 누르면 closeCb가 호출됩니다.", () => {
    const closeCb = jest.fn();
    const { getByText } = render(<TestComponent onClose={closeCb} />);
    const element = getByText("Press ESC");

    element.focus();
    fireEvent.keyDown(element, { key: "Escape", keyCode: 27 });

    expect(closeCb).toHaveBeenCalledTimes(1);
  });

  it("ESC 외 키는 무시됩니다.", () => {
    const closeCb = jest.fn();
    const { getByText } = render(<TestComponent onClose={closeCb} />);
    const element = getByText("Press ESC");

    element.focus();
    fireEvent.keyDown(element, { key: "Enter", keyCode: 13 });

    expect(closeCb).not.toHaveBeenCalled();
  });
});
