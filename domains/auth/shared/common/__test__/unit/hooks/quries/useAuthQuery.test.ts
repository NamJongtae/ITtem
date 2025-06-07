import { renderHook } from "@testing-library/react";
import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../../../../store/authStore";
import useAuthQuery from "../../../../hooks/queries/useAuthQuery";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";

jest.mock("@tanstack/react-query");
jest.mock("../../../../store/authStore");

describe("useAuthQuery 훅 테스트", () => {
  const mockUseQuery = useQuery as jest.Mock;
  const mockUseAuthStore = useAuthStore as unknown as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("useQuery의 데이터는 user로 반환됩니다.", () => {
    mockUseAuthStore.mockImplementation((selector) =>
      selector({ isLoading: true })
    );

    mockUseQuery.mockReturnValue({
      data: { name: "user123" },
      isLoading: false,
      error: null,
      refetch: jest.fn()
    });

    const { result } = renderHook(() => useAuthQuery());

    expect(result.current.user).toEqual({ name: "user123" });
  });

  it("useAuthStore 로딩 상태와 useQuery 로딩 상태를 조합하여 authIsLoading을 계산합니다.", () => {
    mockUseAuthStore.mockImplementation((selector) =>
      selector({ isLoading: true })
    );

    mockUseQuery.mockReturnValue({
      data: { name: "user123" },
      isLoading: true,
      error: null,
      refetch: jest.fn()
    });

    const { result, rerender } = renderHook(() => useAuthQuery());

    // authStoreLoading(true) || authQueryLoading(true) = true
    expect(result.current.authIsLoading).toBe(true);

    mockUseAuthStore.mockImplementationOnce((selector) =>
      selector({ isLoading: false })
    );

    mockUseQuery.mockReturnValueOnce({
      data: { name: "user123" },
      isLoading: false,
      error: null,
      refetch: jest.fn()
    });

    rerender();

    // authStoreLoading(true) || authQueryLoading(false) = false
    expect(result.current.authIsLoading).toBe(false);
  });

  it("useQuery의 isLoading이 true일 때 authIsLoading도 true여야 합니다.", () => {
    mockUseAuthStore.mockImplementation((selector) =>
      selector({ isLoading: false })
    );

    mockUseQuery.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
      refetch: jest.fn()
    });

    const { result } = renderHook(() => useAuthQuery());

    expect(result.current.authIsLoading).toBe(true);
  });

  it("useAuthStore의 isLoading이 true일 때 authIsLoading도 true여야 합니다.", () => {
    mockUseAuthStore.mockImplementation((selector) =>
      selector({ isLoading: true })
    );

    mockUseQuery.mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
      refetch: jest.fn()
    });

    const { result } = renderHook(() => useAuthQuery());

    expect(result.current.authIsLoading).toBe(true);
  });

  it("useQuery의 error가 반환되면 authError도 반환됩니다.", () => {
    const error = new Error("인증 실패");

    mockUseAuthStore.mockImplementation((selector) =>
      selector({ isLoading: false })
    );

    mockUseQuery.mockReturnValue({
      data: null,
      isLoading: false,
      error,
      refetch: jest.fn()
    });

    const { result } = renderHook(() => useAuthQuery());

    expect(result.current.authError).toBe(error);
  });

  it("useQuery의 refetchAuth가 반환되는지 확인합니다.", () => {
    const mockRefetch = jest.fn();

    mockUseAuthStore.mockImplementation((selector) =>
      selector({ isLoading: false })
    );

    mockUseQuery.mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
      refetch: mockRefetch
    });

    const { result } = renderHook(() => useAuthQuery());

    result.current.refetchAuth();
    expect(mockRefetch).toHaveBeenCalled();
  });

  it("queryFn 및 queryKey가 queryKeys.auth.info 값을 기반으로 설정되어야 합니다.", () => {
    mockUseQuery.mockReturnValue({
      data: true,
      error: null,
      isSuccess: true
    });

    renderHook(() => useAuthQuery());

    expect(useQuery).toHaveBeenCalledWith({
      ...queryKeys.auth.info,
      retry: 0,
      staleTime: Infinity,
      enabled: false
    });
  });
});
