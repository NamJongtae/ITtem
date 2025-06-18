// shared/common/components/__test__/Empty.test.tsx

import { render, screen } from "@testing-library/react";
import Empty from "@/shared/common/components/Empty";

describe("Empty 컴포넌트 테스트", () => {
  it("message가 정상적으로 렌더링됩니다.", () => {
    render(<Empty message="테스트 메시지" />);
    expect(screen.getByText("테스트 메시지")).toBeInTheDocument();
  });

  it("iconSize props가 없으면 기본 크기로 렌더링됩니다.", () => {
    render(<Empty message="아이콘 기본" />);
    const img = screen.getByAltText("Empty Icon");
    expect(img).toHaveAttribute("width", "60");
    expect(img).toHaveAttribute("height", "60");
    expect(img.className).toContain("w-[60px] h-[60px]");
  });

  it("iconSize props가 있으면 해당 크기로 렌더링됩니다.", () => {
    render(<Empty message="아이콘 커스텀" iconSize={100} />);
    const img = screen.getByAltText("Empty Icon");
    expect(img).toHaveAttribute("width", "100");
    expect(img).toHaveAttribute("height", "100");
    expect(img.className).toContain("w-[100px] h-[100px]");
  });

  it("messageSize props가 없으면 기본 텍스트 크기(base)로 렌더링됩니다.", () => {
    render(<Empty message="텍스트 기본" />);
    const p = screen.getByText("텍스트 기본");
    expect(p.className).toContain("text-base");
  });

  it("messageSize props가 있으면 해당 크기 텍스트로 렌더링됩니다.", () => {
    render(<Empty message="텍스트 xl" messageSize="xl" />);
    const p = screen.getByText("텍스트 xl");
    expect(p.className).toContain("text-xl");
  });
});
