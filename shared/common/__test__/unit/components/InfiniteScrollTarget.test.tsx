import React, { createRef } from "react";
import { render, screen } from "@testing-library/react";
import InfiniteScrollTarget from "@/shared/common/components/InfiniteScrollTarget";

describe("InfiniteScrollTarget 컴포넌트 테스트", () => {
  it("hasNextPage가 true일 때 컴포넌트가 렌더링됩니다.", () => {
    render(<InfiniteScrollTarget hasNextPage={true} />);

    const listItem = screen.getByRole("listitem");
    const targetDiv = listItem.querySelector("div");

    expect(listItem).toBeInTheDocument();
    expect(targetDiv).toBeInTheDocument();
    expect(targetDiv).toHaveClass("h-10");
  });

  it("hasNextPage가 false일 때 컴포넌트가 렌더링되지 않습니다.", () => {
    render(<InfiniteScrollTarget hasNextPage={false} />);

    const listItem = screen.queryByRole("listitem");
    expect(listItem).not.toBeInTheDocument();
  });

  it("ref가 올바르게 전달됩니다.", () => {
    const ref = createRef<HTMLDivElement>();

    render(<InfiniteScrollTarget hasNextPage={true} ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveClass("h-10");
  });

});
