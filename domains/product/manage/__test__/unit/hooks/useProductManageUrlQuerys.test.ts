// __tests__/useProductManageUrlQuerys.test.tsx
import { renderHook } from "@testing-library/react";
import useProductManageUrlQuerys from "../../../hooks/useProductManageUrlQuerys";
import { useGetQuerys } from "@/shared/common/hooks/useGetQuerys";

// useGetQuerys 훅을 mock 처리
jest.mock("@/shared/common/hooks/useGetQuerys");

describe("useProductManageUrlQuerys", () => {
  const mockUseGetQuerys = useGetQuerys as jest.Mock;
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("유효한 menu, status 값이 있을 때 그대로 반환되는지 확인합니다.", () => {
    mockUseGetQuerys.mockReturnValue({
      menu: "purchase",
      search: "티셔츠",
      status: "TRADING_END"
    });

    const { result } = renderHook(() => useProductManageUrlQuerys());

    expect(result.current.menu).toBe("purchase");
    expect(result.current.status).toBe("TRADING_END");
    expect(result.current.search).toBe("티셔츠");
  });

  it("유효하지 않은 menu가 들어올 경우 기본값 'sale'을 반환하는지 확인합니다.", () => {
    mockUseGetQuerys.mockReturnValue({
      menu: "invalid_menu",
      search: "신발",
      status: "TRADING_END"
    });

    const { result } = renderHook(() => useProductManageUrlQuerys());

    expect(result.current.menu).toBe("sale");
    expect(result.current.status).toBe("TRADING_END");
    expect(result.current.search).toBe("신발");
  });

  it("유효하지 않은 status가 들어올 경우 기본값 'TRADING'을 반환하는지 확인합니다.", () => {
    mockUseGetQuerys.mockReturnValue({
      menu: "sale",
      search: "가방",
      status: "INVALID_STATUS"
    });

    const { result } = renderHook(() => useProductManageUrlQuerys());

    expect(result.current.menu).toBe("sale");
    expect(result.current.status).toBe("TRADING");
    expect(result.current.search).toBe("가방");
  });

  it("menu와 status 모두 유효하지 않을 경우 기본값들이 설정되는지 확인합니다.", () => {
    mockUseGetQuerys.mockReturnValue({
      menu: "wrong",
      search: "모자",
      status: "wrong_status"
    });

    const { result } = renderHook(() => useProductManageUrlQuerys());

    expect(result.current.menu).toBe("sale");
    expect(result.current.status).toBe("TRADING");
    expect(result.current.search).toBe("모자");
  });
});
