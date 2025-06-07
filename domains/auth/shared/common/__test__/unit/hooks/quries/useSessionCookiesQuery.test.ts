import { renderHook } from "@testing-library/react";
import { useQuery } from "@tanstack/react-query";
import useSessionCookiesQuery from "../../../../hooks/queries/useSessionCookiesQuery";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";

jest.mock("@tanstack/react-query");

describe("useSessionCookiesQuery 훅 테스트", () => {
  const mockUseQuery = useQuery as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("세션이 존재하는 경우 isExistSession가 true로 반환됩니다.", () => {
    mockUseQuery.mockReturnValue({
      data: true,
      error: null,
      isSuccess: true
    });

    const { result } = renderHook(() => useSessionCookiesQuery());

    expect(result.current.isExistSession).toBe(true);
    expect(result.current.sessionQueryIsSuccess).toBe(true);
    expect(result.current.sessionQueryError).toBeNull();
  });

  it("세션이 존재하지 않는 경우 data가 false로 반환됩니다.", () => {
    mockUseQuery.mockReturnValue({
      data: false,
      error: null,
      isSuccess: true
    });

    const { result } = renderHook(() => useSessionCookiesQuery());

    expect(result.current.isExistSession).toBe(false);
    expect(result.current.sessionQueryIsSuccess).toBe(true);
    expect(result.current.sessionQueryError).toBeNull();
  });

  it("useQuery의 에러가 반환되면 sessionQueryError도 반환됩니다.", () => {
    const error = new Error("세션 확인 실패");

    mockUseQuery.mockReturnValue({
      data: undefined,
      error,
      isSuccess: false
    });

    const { result } = renderHook(() => useSessionCookiesQuery());

    expect(result.current.isExistSession).toBeUndefined();
    expect(result.current.sessionQueryIsSuccess).toBe(false);
    expect(result.current.sessionQueryError).toBe(error);
  });

  it("queryFn 및 queryKey가 queryKeys.session.isExist 값을 기반으로 설정되어야 합니다.", () => {
    const queryConfig = queryKeys.session.isExist;

    mockUseQuery.mockReturnValue({
      data: true,
      error: null,
      isSuccess: true
    });

    renderHook(() => useSessionCookiesQuery());

    expect(useQuery).toHaveBeenCalledWith({
      queryFn: queryConfig.queryFn,
      queryKey: queryConfig.queryKey
    });
  });
});
