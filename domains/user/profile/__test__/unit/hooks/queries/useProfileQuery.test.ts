import { renderHook } from "@testing-library/react";
import useProfileQuery from "@/domains/user/profile/hooks/queries/useProfileQuery";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

jest.mock("@tanstack/react-query", () => {
  const original = jest.requireActual("@tanstack/react-query");
  return {
    ...original,
    useSuspenseQuery: jest.fn()
  };
});

jest.mock("next/navigation", () => ({
  useParams: jest.fn()
}));

describe("useProfileQuery 훅 테스트", () => {
  const mockUseSuspenseQuery = useSuspenseQuery as jest.Mock;
  const mockUseParams = useParams as unknown as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("uid를 인자로 전달받은 경우 해당 uid로 쿼리를 요청합니다.", () => {
    const mockUid = "user-123";
    const mockData = { uid: mockUid, name: "테스트 유저" };

    mockUseSuspenseQuery.mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
      isSuccess: true
    });

    const { result } = renderHook(() => useProfileQuery(mockUid));

    expect(mockUseSuspenseQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: expect.any(Array),
        queryFn: expect.any(Function),
        staleTime: Infinity,
        refetchOnMount: "always"
      })
    );

    expect(result.current.profileData).toEqual(mockData);
    expect(result.current.profileLoading).toBe(false);
    expect(result.current.profileError).toBeNull();
    expect(result.current.profileSuccess).toBe(true);
  });

  it("uid를 전달받지 않은 경우 useParams에서 uid를 사용합니다.", () => {
    const mockUid = "user-from-params";
    const mockData = { uid: mockUid, name: "유저 B" };

    mockUseParams.mockReturnValue({ uid: mockUid });
    mockUseSuspenseQuery.mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
      isSuccess: true
    });

    const { result } = renderHook(() => useProfileQuery());

    expect(mockUseSuspenseQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: expect.any(Array),
        queryFn: expect.any(Function),
        staleTime: Infinity,
        refetchOnMount: "always"
      })
    );

    expect(result.current.profileData).toEqual(mockData);
    expect(result.current.profileSuccess).toBe(true);
  });
});
