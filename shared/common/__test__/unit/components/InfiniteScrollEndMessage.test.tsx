import React from "react";
import { render, screen } from "@testing-library/react";
import InfiniteScrollEndMessage from "@/shared/common/components/InfiniteScrollEndMessage";

describe("InfiniteScrollEndMessage 컴포넌트 테스트", () => {
  const defaultMessage = "더 이상 데이터가 존재하지 않습니다.";
  const customMessage = "모든 데이터를 불러왔습니다.";

  it("데이터가 있고 hasNextPage가 false일 때 메시지가 렌더링됩니다.", () => {
    const mockData = [{ id: 1 }, { id: 2 }, { id: 3 }];

    render(<InfiniteScrollEndMessage hasNextPage={false} data={mockData} />);

    const message = screen.getByText(defaultMessage);
    expect(message).toBeInTheDocument();
    expect(message).toHaveClass(
      "text-center",
      "text-xs",
      "sm:text-sm",
      "text-gray-500",
      "bg-white",
      "px-4",
      "sm:px-8"
    );
  });

  it("커스텀 메시지가 올바르게 렌더링됩니다.", () => {
    const mockData = [{ id: 1 }, { id: 2 }];

    render(
      <InfiniteScrollEndMessage
        hasNextPage={false}
        data={mockData}
        message={customMessage}
      />
    );

    const message = screen.getByText(customMessage);
    expect(message).toBeInTheDocument();
    expect(screen.queryByText(defaultMessage)).not.toBeInTheDocument();
  });

  it("hasNextPage가 true일 때 메시지가 렌더링되지 않습니다.", () => {
    const mockData = [{ id: 1 }, { id: 2 }];

    render(<InfiniteScrollEndMessage hasNextPage={true} data={mockData} />);

    expect(screen.queryByText(defaultMessage)).not.toBeInTheDocument();
  });

  it("데이터가 undefined일 때 메시지가 렌더링되지 않습니다.", () => {
    render(<InfiniteScrollEndMessage hasNextPage={false} data={undefined} />);

    expect(screen.queryByText(defaultMessage)).not.toBeInTheDocument();
  });

  it("데이터가 빈 배열일 때 메시지가 렌더링되지 않습니다.", () => {
    render(<InfiniteScrollEndMessage hasNextPage={false} data={[]} />);

    expect(screen.queryByText(defaultMessage)).not.toBeInTheDocument();
  });

  it("데이터가 있지만 hasNextPage가 true일 때 메시지가 렌더링되지 않습니다.", () => {
    const mockData = [{ id: 1 }, { id: 2 }];

    render(<InfiniteScrollEndMessage hasNextPage={true} data={mockData} />);

    expect(screen.queryByText(defaultMessage)).not.toBeInTheDocument();
  });

  it("모든 조건(데이터가 있고 hasNextPage가 false)이 만족할 때 렌더링됩니다.", () => {
    render(<InfiniteScrollEndMessage hasNextPage={false} data={[{ id: 1 }]} />);

    expect(screen.getByText(defaultMessage)).toBeInTheDocument();
  });
});
