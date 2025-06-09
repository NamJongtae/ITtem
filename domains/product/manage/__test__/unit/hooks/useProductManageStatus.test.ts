import { renderHook, act } from "@testing-library/react";
import useProductManageStatus from "../../../hooks/useProductManageStatus";
import { ProductManageStatusType } from "../../../types/productManageTypes";
import {
  productStatusEncoder,
  productStatusParser
} from "../../../utils/productManageStatusMapper";
import useProductManageUrlQuerys from "../../../hooks/useProductManageUrlQuerys";
import { useCustomRouter } from "@/shared/common/hooks/useCustomRouter";

jest.mock("../../../hooks/useProductManageUrlQuerys");
jest.mock("@/shared/common/hooks/useCustomRouter");

describe("useProductManageStatus", () => {
  const navigateMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useProductManageUrlQuerys as jest.Mock).mockReturnValue({
      menu: "sales",
      search: "노트북",
      status: "TRADING"
    });

    (useCustomRouter as jest.Mock).mockReturnValue({
      navigate: navigateMock
    });
  });

  it("productManageStatus가 올바른 파싱값을 반환해야합니다.", () => {
    const { result } = renderHook(() => useProductManageStatus());

    const expectedStatus = productStatusParser["TRADING"];
    expect(result.current.productManageStatus).toEqual(expectedStatus);
  });

  it("handleChangeManageStatus 실행 시 search값이 있을 때 search, status 모두 값을 포함한 URL로 이동해야 합니다.", () => {
    const { result } = renderHook(() => useProductManageStatus());

    act(() => {
      result.current.handleChangeManageStatus("거래중");
    });

    const queryStatus = productStatusEncoder["거래중"];
    expect(navigateMock).toHaveBeenCalledWith({
      type: "push",
      url: `/product/manage?menu=sales&search=노트북&status=${queryStatus}`
    });
  });

  it("handleChangeManageStatus 실행 시 search 없는 경우 status값만 포함된 URL로 이동해야 합니다.", () => {
    const { result } = renderHook(() => useProductManageStatus());

    act(() => {
      result.current.handleChangeManageStatus("거래중");
    });

    const queryStatus = productStatusEncoder["거래중"];
    expect(navigateMock).toHaveBeenCalledWith({
      type: "push",
      url: `/product/manage?menu=sales&search=노트북&status=${queryStatus}`
    });
  });
});
