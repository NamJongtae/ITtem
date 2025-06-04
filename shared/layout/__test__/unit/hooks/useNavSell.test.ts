import useNavSell from "@/shared/layout/hooks/useNavSell";
import { renderHook, act } from "@testing-library/react";
import { usePathname, useRouter } from "next/navigation";

jest.mock("next/navigation");

describe("useNavSell 훅 테스트", () => {
  const mockPush = jest.fn();
  const mockPathname = "/search/product?keyword=test";

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (usePathname as jest.Mock).mockReturnValue(mockPathname);
  });

  it("pathname과 handleClickSell를 반환해야 합니다.", () => {
    const { result } = renderHook(() => useNavSell());

    expect(result.current.pathname).toBe(mockPathname);
    expect(typeof result.current.handleClickSell).toBe("function");
  });

  it("handleClickSell 호출하면 /product/upload로 이동해야 합니다.", () => {
    const { result } = renderHook(() => useNavSell());

    act(() => {
      result.current.handleClickSell();
    });

    expect(mockPush).toHaveBeenCalledWith("/product/upload");
  });
});
