import useNavProduct from "@/shared/layout/hooks/useNavProduct";
import { renderHook, act } from "@testing-library/react";
import { usePathname, useRouter } from "next/navigation";

jest.mock("next/navigation");

describe("useNavProduct 훅 테스트", () => {
  const mockPush = jest.fn();
  const mockPathname = "/search/product?keyword=test";

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (usePathname as jest.Mock).mockReturnValue(mockPathname);
  });

  it("pathname과 handleClickProduct를 반환해야 합니다.", () => {
    const { result } = renderHook(() => useNavProduct());

    expect(result.current.pathname).toBe(mockPathname);
    expect(typeof result.current.handleClickProduct).toBe("function");
  });

  it("handleClickProduct를 호출하면 /product/manage로 이동해야 합니다.", () => {
    const { result } = renderHook(() => useNavProduct());

    act(() => {
      result.current.handleClickProduct();
    });

    expect(mockPush).toHaveBeenCalledWith("/product/manage");
  });
});
