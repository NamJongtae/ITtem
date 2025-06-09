import { renderHook, act } from "@testing-library/react";
import useProductMenu from "../../../hooks/useProductMenu";
import useProductManageUrlQuerys from "../../../hooks/useProductManageUrlQuerys";
import { useCustomRouter } from "@/shared/common/hooks/useCustomRouter";
import { useGetQuerys } from "@/shared/common/hooks/useGetQuerys";

jest.mock("../../../hooks/useProductManageUrlQuerys");
jest.mock("@/shared/common/hooks/useCustomRouter");

describe("useProductMenu 훅 테스트", () => {
  const navigateMock = jest.fn();
  const mockUseCustomRouter = useCustomRouter as jest.Mock;
  const mockUseProductManageUrlQuerys = useProductManageUrlQuerys as jest.Mock;
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseProductManageUrlQuerys.mockReturnValue({
      menu: "sale",
      search: "셔츠",
      status: "TRADING_END"
    });

    mockUseCustomRouter.mockReturnValue({
      navigate: navigateMock
    });
  });

  it("menu 값이 정확히 반환되는지 확인합니다.", () => {
    const { result } = renderHook(() => useProductMenu());
    expect(result.current.menu).toBe("sale");
  });

  it("handleChangeMenu 호출 시 search값이 있는 경우 search, status값을 포함한 URL로 이동합니다.", () => {
    const { result } = renderHook(() => useProductMenu());

    act(() => {
      result.current.handleChangeMenu("sale");
    });

    expect(navigateMock).toHaveBeenCalledWith({
      type: "push",
      url: `/product/manage?menu=sale&search=셔츠&status=TRADING_END`
    });
  });

  it("handleChangeMenu 호출 시 search 값이 없을 때 status값만 포함한 URL로 이동합니다.", () => {
    mockUseProductManageUrlQuerys.mockReturnValue({
      menu: "purchase",
      search: "",
      status: "TRADING_END"
    });

    const { result } = renderHook(() => useProductMenu());

    act(() => {
      result.current.handleChangeMenu("purchase");
    });

    expect(navigateMock).toHaveBeenCalledWith({
      type: "push",
      url: `/product/manage?menu=purchase&status=TRADING_END`
    });
  });
});
