import React from "react";
import { render, screen } from "@testing-library/react";
import Portal from "@/shared/common/components/Portal";

beforeEach(() => {
  const portalRoot = document.createElement("div");
  portalRoot.setAttribute("id", "portal-root");
  document.body.appendChild(portalRoot);
});

afterEach(() => {
  const portalRoot = document.getElementById("portal-root");
  if (portalRoot) {
    portalRoot.remove();
  }
});

describe("Portal 컴포넌트 테스트", () => {
  it("클라이언트에서 children이 portal-root에 렌더링됩니다.", () => {
    render(
      <Portal>
        <p data-testid="portal-content">포탈 콘텐츠</p>
      </Portal>
    );

    const portalContent = screen.getByTestId("portal-content");
    expect(portalContent).toBeInTheDocument();

    const portalRoot = document.getElementById("portal-root");
    expect(portalRoot?.contains(portalContent)).toBe(true);
  });
});
