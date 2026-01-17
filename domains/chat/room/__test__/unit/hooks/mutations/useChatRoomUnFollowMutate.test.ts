import { renderHook, act, waitFor } from "@testing-library/react";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import useChatRoomUnFollowMutate from "@/domains/chat/room/hooks/mutations/useChatRoomUnFollowMutate";
import unfollowUser from "@/domains/user/shared/api/unfollowUser";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";
import { toast } from "react-toastify";

jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  }
}));

jest.mock("@/domains/user/shared/api/unfollowUser");

type FetchError = {
  status: number;
  message: string;
};

describe("useChatRoomUnFollowMutate 훅 테스트", () => {
  const { Wrapper: wrapper, queryClient } = createQueryClientWrapper();
  const mockUnfollowUser = unfollowUser as jest.Mock;

  const targetUid = "targetUser123";

  const targetFollowStatusQueryKey =
    queryKeys.profile.user(targetUid)._ctx.isFollow.queryKey;

  let cancelSpy: jest.SpyInstance;
  let setSpy: jest.SpyInstance;
  let removeSpy: jest.SpyInstance;
  let invalidateSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    queryClient.clear(); // ✅ 테스트 간 캐시 격리

    cancelSpy = jest.spyOn(queryClient, "cancelQueries");
    setSpy = jest.spyOn(queryClient, "setQueryData");
    removeSpy = jest.spyOn(queryClient, "removeQueries");
    invalidateSpy = jest.spyOn(queryClient, "invalidateQueries");
  });

  it("onMutate에서 follow-status cancelQueries 후 isFollow를 false로 optimistic 업데이트합니다.", async () => {
    const { result } = renderHook(() => useChatRoomUnFollowMutate(targetUid), {
      wrapper
    });

    act(() => {
      result.current.userUnFollowMutate();
    });

    await waitFor(() => {
      expect(cancelSpy).toHaveBeenCalledWith({
        queryKey: targetFollowStatusQueryKey
      });

      expect(queryClient.getQueryData(targetFollowStatusQueryKey)).toBe(false);
    });
  });

  it("onError에서 이전 follow-status가 true면 true로 롤백합니다.", async () => {
    queryClient.setQueryData(targetFollowStatusQueryKey, true);

    const err: FetchError = { status: 500, message: "fail" };
    mockUnfollowUser.mockRejectedValue(err);

    const { result } = renderHook(() => useChatRoomUnFollowMutate(targetUid), {
      wrapper
    });

    act(() => {
      result.current.userUnFollowMutate();
    });

    await waitFor(() => {
      expect(setSpy).toHaveBeenCalledWith(targetFollowStatusQueryKey, true);
      expect(queryClient.getQueryData(targetFollowStatusQueryKey)).toBe(true);
    });
  });

  it("onError에서 이전 follow-status가 false여도 false로 롤백합니다.", async () => {
    queryClient.setQueryData(targetFollowStatusQueryKey, false);

    const err: FetchError = { status: 500, message: "fail" };
    mockUnfollowUser.mockRejectedValue(err);

    const { result } = renderHook(() => useChatRoomUnFollowMutate(targetUid), {
      wrapper
    });

    act(() => {
      result.current.userUnFollowMutate();
    });

    await waitFor(() => {
      expect(setSpy).toHaveBeenCalledWith(targetFollowStatusQueryKey, false);
      expect(queryClient.getQueryData(targetFollowStatusQueryKey)).toBe(false);
    });
  });

  it("onError에서 이전 follow-status가 undefined면 follow-status 쿼리를 removeQueries 합니다.", async () => {
    const err: FetchError = { status: 500, message: "fail" };
    mockUnfollowUser.mockRejectedValue(err);

    const { result } = renderHook(() => useChatRoomUnFollowMutate(targetUid), {
      wrapper
    });

    act(() => {
      result.current.userUnFollowMutate();
    });

    await waitFor(() => {
      expect(removeSpy).toHaveBeenCalledWith({
        queryKey: targetFollowStatusQueryKey
      });
      expect(
        queryClient.getQueryData(targetFollowStatusQueryKey)
      ).toBeUndefined();
    });
  });

  it("onError에서 status 409이면 toast.warn(이미 언팔로우) 호출", async () => {
    const err: FetchError = { status: 409, message: "dup" };
    mockUnfollowUser.mockRejectedValue(err);

    const { result } = renderHook(() => useChatRoomUnFollowMutate(targetUid), {
      wrapper
    });

    act(() => {
      result.current.userUnFollowMutate();
    });

    await waitFor(() => {
      expect(toast.warn).toHaveBeenCalledWith("이미 언팔로우한 유저에요.");
    });
  });

  it("onError에서 status 409가 아니면 일반 실패 toast.warn 호출", async () => {
    const err: FetchError = { status: 500, message: "fail" };
    mockUnfollowUser.mockRejectedValue(err);

    const { result } = renderHook(() => useChatRoomUnFollowMutate(targetUid), {
      wrapper
    });

    act(() => {
      result.current.userUnFollowMutate();
    });

    await waitFor(() => {
      expect(toast.warn).toHaveBeenCalledWith(
        "유저 언팔로우에 실패했어요.\n잠시 후에 다시 시도해주세요."
      );
    });
  });

  it("onSettled에서 follow-status 쿼리를 invalidateQueries 합니다.", async () => {
    mockUnfollowUser.mockResolvedValue({ message: "ok" });

    const { result } = renderHook(() => useChatRoomUnFollowMutate(targetUid), {
      wrapper
    });

    act(() => {
      result.current.userUnFollowMutate();
    });

    await waitFor(() => {
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: targetFollowStatusQueryKey
      });
    });
  });
});
