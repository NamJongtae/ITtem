import React from "react";
import { render, screen } from "@testing-library/react";
import GlobalLoading from "@/shared/common/components/GlobalLoading";

jest.mock("@/shared/common/store/globalLogingStore", () => ({
  __esModule: true,
  default: jest.fn()
}));
jest.mock("@/shared/common/hooks/useBodyOverflow", () => ({
  __esModule: true,
  default: jest.fn()
}));
jest.mock("@/shared/common/components/Loading", () => ({
  __esModule: true,
  default: () => <div data-testid="loading-component">로딩중...</div>
}));

import useGlobalLoadingStore from "@/shared/common/store/globalLogingStore";
import useBodyOverflow from "@/shared/common/hooks/useBodyOverflow";

describe("GlobalLoading 컴포넌트 테스트", () => {
  const mockUseGlobalLoadingStore = jest.mocked(useGlobalLoadingStore);
  const mockUseBodyOverflow = jest.mocked(useBodyOverflow);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("isLoading이 true일 때 Loading 컴포넌트를 렌더링합니다.", () => {
    mockUseGlobalLoadingStore.mockReturnValue({ isLoading: true });
    render(<GlobalLoading />);
    expect(screen.getByTestId("loading-component")).toBeInTheDocument();
  });

  it("isLoading이 false일 때 아무것도 렌더링하지 않습니다.", () => {
    mockUseGlobalLoadingStore.mockReturnValue({ isLoading: false });
    render(<GlobalLoading />);
    expect(screen.queryByTestId("loading-component")).not.toBeInTheDocument();
  });

  it("isLoading 상태에 따라 useBodyOverflow가 올바르게 호출됩니다.", () => {
    mockUseGlobalLoadingStore.mockReturnValue({ isLoading: true });
    render(<GlobalLoading />);
    expect(mockUseBodyOverflow).toHaveBeenCalledWith({ isLocked: true });

    jest.clearAllMocks();

    mockUseGlobalLoadingStore.mockReturnValue({ isLoading: false });
    render(<GlobalLoading />);
    expect(mockUseBodyOverflow).toHaveBeenCalledWith({ isLocked: false });
  });
});
