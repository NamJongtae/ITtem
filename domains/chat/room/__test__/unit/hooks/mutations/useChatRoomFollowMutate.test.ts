import { renderHook, act, waitFor } from "@testing-library/react";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import useChatRoomFollowMutate from "@/domains/chat/room/hooks/mutations/useChatRoomFollowMutate";
import followUser from "@/domains/user/shared/api/followUser";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";
import { toast } from "react-toastify";

jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  }
}));

jest.mock("@/domains/user/shared/api/followUser");

type FetchError = {
  status: number;
  message: string;
};

describe("useChatRoomFollowMutate 훅 테스트", () => {
  const { Wrapper: wrapper, queryClient } = createQueryClientWrapper();
  const mockFollowUser = followUser as jest.Mock;

  const targetUid = "targetUser123";

  const targetFollowStatusQueryKey =
    queryKeys.profile.user(targetUid)._ctx.isFollow.queryKey;

  let cancelSpy: jest.SpyInstance;
  let setSpy: jest.SpyInstance;
  let removeSpy: jest.SpyInstance;
  let invalidateSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    queryClient.clear(); // ✅ 캐시 격리

    cancelSpy = jest.spyOn(queryClient, "cancelQueries");
    setSpy = jest.spyOn(queryClient, "setQueryData");
    removeSpy = jest.spyOn(queryClient, "removeQueries");
    invalidateSpy = jest.spyOn(queryClient, "invalidateQueries");
  });

  it("onMutate에서 follow-status cancelQueries 후 isFollow를 true로 optimistic 업데이트합니다.", async () => {
    const { result } = renderHook(() => useChatRoomFollowMutate(targetUid), {
      wrapper
    });

    act(() => {
      result.current.userFollowMutate();
    });

    await waitFor(() => {
      expect(cancelSpy).toHaveBeenCalledWith({
        queryKey: targetFollowStatusQueryKey
      });

      expect(queryClient.getQueryData(targetFollowStatusQueryKey)).toBe(true);
    });
  });

  it("onError에서 이전 follow-status가 true면 true로 롤백합니다.", async () => {
    queryClient.setQueryData(targetFollowStatusQueryKey, true);

    const err: FetchError = { status: 500, message: "fail" };
    mockFollowUser.mockRejectedValue(err);

    const { result } = renderHook(() => useChatRoomFollowMutate(targetUid), {
      wrapper
    });

    act(() => {
      result.current.userFollowMutate();
    });

    await waitFor(() => {
      expect(setSpy).toHaveBeenCalledWith(targetFollowStatusQueryKey, true);
      expect(queryClient.getQueryData(targetFollowStatusQueryKey)).toBe(true);
    });
  });

  it("onError에서 이전 follow-status가 false여도 false로 롤백합니다.", async () => {
    queryClient.setQueryData(targetFollowStatusQueryKey, false);

    const err: FetchError = { status: 500, message: "fail" };
    mockFollowUser.mockRejectedValue(err);

    const { result } = renderHook(() => useChatRoomFollowMutate(targetUid), {
      wrapper
    });

    act(() => {
      result.current.userFollowMutate();
    });

    await waitFor(() => {
      expect(setSpy).toHaveBeenCalledWith(targetFollowStatusQueryKey, false);
      expect(queryClient.getQueryData(targetFollowStatusQueryKey)).toBe(false);
    });
  });

  it("onError에서 이전 follow-status가 undefined면 follow-status 쿼리를 removeQueries 합니다.", async () => {
    const err: FetchError = { status: 500, message: "fail" };
    mockFollowUser.mockRejectedValue(err);

    const { result } = renderHook(() => useChatRoomFollowMutate(targetUid), {
      wrapper
    });

    act(() => {
      result.current.userFollowMutate();
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

  it("onError에서 status 409이면 toast.warn(이미 팔로우) 호출", async () => {
    const err: FetchError = { status: 409, message: "dup" };
    mockFollowUser.mockRejectedValue(err);

    const { result } = renderHook(() => useChatRoomFollowMutate(targetUid), {
      wrapper
    });

    act(() => {
      result.current.userFollowMutate();
    });

    await waitFor(() => {
      expect(toast.warn).toHaveBeenCalledWith("이미 팔로우한 유저에요.");
    });
  });

  it("onError에서 status 409가 아니면 일반 실패 toast.warn 호출", async () => {
    const err: FetchError = { status: 500, message: "fail" };
    mockFollowUser.mockRejectedValue(err);

    const { result } = renderHook(() => useChatRoomFollowMutate(targetUid), {
      wrapper
    });

    act(() => {
      result.current.userFollowMutate();
    });

    await waitFor(() => {
      expect(toast.warn).toHaveBeenCalledWith(
        "유저 팔로우에 실패했어요.\n잠시 후에 다시 시도해주세요."
      );
    });
  });

  it("onSettled에서 follow-status 쿼리를 invalidateQueries 합니다.", async () => {
    mockFollowUser.mockResolvedValue({ message: "ok" });

    const { result } = renderHook(() => useChatRoomFollowMutate(targetUid), {
      wrapper
    });

    act(() => {
      result.current.userFollowMutate();
    });

    await waitFor(() => {
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: targetFollowStatusQueryKey
      });
    });
  });
});
