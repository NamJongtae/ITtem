import { renderHook, act, waitFor } from "@testing-library/react";
import useUserProfileFollowMutate from "@/domains/user/profile/hooks/mutations/useUserProfileFollowMutate";
import followUser from "@/domains/user/shared/api/followUser";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import { toast } from "react-toastify";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";
import type {
  ProfileData,
  FollowUserData
} from "@/domains/user/profile/types/profileTypes";
import type { InfiniteData } from "@tanstack/react-query";

jest.mock("@/domains/user/shared/api/followUser");
jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  }
}));
jest.mock("@/domains/auth/shared/common/store/authStore", () => ({
  __esModule: true,
  default: jest.fn()
}));

type FetchError = {
  status: number;
  message: string;
};

type InfiniteProfileList = InfiniteData<FollowUserData[], unknown>;

describe("useUserProfileFollowMutate 훅 테스트", () => {
  const { Wrapper: wrapper, queryClient } = createQueryClientWrapper();
  const mockFollowUser = followUser as jest.Mock;

  const myUid = "user1";
  const targetUid = "user2";

  // ✅ 훅 내부에서 쓰는 queryKey와 동일하게 맞춰야 함
  const myProfileQueryKey = queryKeys.profile.my.queryKey;
  const myFollowingsQueryKey = queryKeys.profile.my._ctx.followings({
    uid: myUid,
    limit: 10
  }).queryKey;

  const targetProfileQueryKey = queryKeys.profile.user(targetUid).queryKey;
  const targetFollowersQueryKey = queryKeys.profile
    .user(targetUid)
    ._ctx.followers({
      uid: targetUid,
      limit: 10
    }).queryKey;
  const targetFollowingsQueryKey = queryKeys.profile
    .user(targetUid)
    ._ctx.followings({
      uid: targetUid,
      limit: 10
    }).queryKey;

  let cancelSpy: jest.SpyInstance;
  let invalidateSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();

    // ✅ useAuthStore selector mock
    (useAuthStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        user: { uid: myUid }
      })
    );

    // ✅ 내 프로필(나 카드 만들기용)
    const fakeMyProfile: ProfileData = {
      uid: myUid,
      nickname: "me",
      profileImg: "me.png",
      followersCount: 0,
      followingsCount: 3,
      productIds: [],
      reviewInfo: { reviewPercentage: 77 }
    } as any;

    // ✅ 상대 프로필(optimistic: followersCount+1, isFollow=true)
    const fakeTargetProfile: ProfileData = {
      uid: targetUid,
      followersCount: 10,
      isFollow: false
    } as any;

    // ✅ 상대 followers 목록(optimistic: 내 카드 삽입)
    const fakeTargetFollowers: InfiniteProfileList = {
      pages: [
        [
          {
            uid: "other",
            nickname: "other",
            profileImg: "o.png",
            followersCount: 0,
            followingsCount: 0,
            isFollow: false,
            productIds: [],
            reviewPercentage: 0
          }
        ]
      ],
      pageParams: []
    };

    // ✅ 상대 followings 목록에 "내 카드"가 이미 있을 수 있음 → 그 카드 followingsCount+1
    const fakeTargetFollowings: InfiniteProfileList = {
      pages: [
        [
          {
            uid: myUid,
            nickname: "me",
            profileImg: "me.png",
            followersCount: 0,
            followingsCount: 3,
            isFollow: false,
            productIds: [],
            reviewPercentage: 77
          },
          {
            uid: "someone",
            nickname: "s",
            profileImg: "s.png",
            followersCount: 0,
            followingsCount: 0,
            isFollow: false,
            productIds: [],
            reviewPercentage: 0
          }
        ]
      ],
      pageParams: []
    };

    queryClient.setQueryData(myProfileQueryKey, fakeMyProfile);
    queryClient.setQueryData(targetProfileQueryKey, fakeTargetProfile);
    queryClient.setQueryData(targetFollowersQueryKey, fakeTargetFollowers);
    queryClient.setQueryData(targetFollowingsQueryKey, fakeTargetFollowings);

    cancelSpy = jest.spyOn(queryClient, "cancelQueries");
    invalidateSpy = jest.spyOn(queryClient, "invalidateQueries");
  });

  it("onMutate에서 target 캐시 cancel + optimistic 업데이트 수행", async () => {
    mockFollowUser.mockResolvedValue({ message: "ok" });

    const { result } = renderHook(() => useUserProfileFollowMutate(targetUid), {
      wrapper
    });

    act(() => {
      result.current.userFollowMutate();
    });

    await waitFor(() => {
      // ✅ cancelQueries는 target쪽 3개만
      expect(cancelSpy).toHaveBeenCalledWith({
        queryKey: targetProfileQueryKey
      });
      expect(cancelSpy).toHaveBeenCalledWith({
        queryKey: targetFollowersQueryKey
      });
      expect(cancelSpy).toHaveBeenCalledWith({
        queryKey: targetFollowingsQueryKey
      });

      // ✅ 1) target profile: followersCount +1, isFollow true
      const updatedTargetProfile = queryClient.getQueryData(
        targetProfileQueryKey
      ) as any;
      expect(updatedTargetProfile.followersCount).toBe(11);
      expect(updatedTargetProfile.isFollow).toBe(true);

      // ✅ 2) target followers: 내 카드가 맨 앞에 삽입 + 내 followingsCount는 +1 반영
      const updatedTargetFollowers = queryClient.getQueryData(
        targetFollowersQueryKey
      ) as InfiniteProfileList;

      expect(updatedTargetFollowers.pages[0][0].uid).toBe(myUid);
      expect(updatedTargetFollowers.pages[0][0].followingsCount).toBe(4); // 기존 3 + 1
      expect(
        updatedTargetFollowers.pages[0].some((u) => u.uid === "other")
      ).toBe(true);

      // ✅ 3) target followings에 내 카드가 있으면 followingsCount +1
      const updatedTargetFollowings = queryClient.getQueryData(
        targetFollowingsQueryKey
      ) as InfiniteProfileList;

      const myCard = updatedTargetFollowings.pages[0].find(
        (u) => u.uid === myUid
      )!;
      expect(myCard.followingsCount).toBe(4);
    });
  });

  it("onError에서 target 캐시 롤백 + status 409이면 toast.warn(이미 팔로우)", async () => {
    const err: FetchError = { status: 409, message: "이미 팔로우" };
    mockFollowUser.mockRejectedValue(err);

    const { result } = renderHook(() => useUserProfileFollowMutate(targetUid), {
      wrapper
    });

    act(() => {
      result.current.userFollowMutate();
    });

    await waitFor(() => {
      // ✅ 롤백: target profile이 원래대로 (followersCount=10, isFollow=false)
      const rolledBackTargetProfile = queryClient.getQueryData(
        targetProfileQueryKey
      ) as any;
      expect(rolledBackTargetProfile.followersCount).toBe(10);
      expect(rolledBackTargetProfile.isFollow).toBe(false);

      // ✅ 롤백: target followers 맨 앞이 myUid가 아니어야 함
      const rolledBackTargetFollowers = queryClient.getQueryData(
        targetFollowersQueryKey
      ) as InfiniteProfileList;
      expect(rolledBackTargetFollowers.pages[0][0].uid).not.toBe(myUid);

      // ✅ 롤백: target followings 내 카드 followingsCount 원복(3)
      const rolledBackTargetFollowings = queryClient.getQueryData(
        targetFollowingsQueryKey
      ) as InfiniteProfileList;
      const myCard = rolledBackTargetFollowings.pages[0].find(
        (u) => u.uid === myUid
      )!;
      expect(myCard.followingsCount).toBe(3);

      expect(toast.warn).toHaveBeenCalledWith("이미 팔로우한 유저에요.");
    });
  });

  it("onError에서 status가 409가 아니면 일반 실패 toast.warn 호출", async () => {
    const err: FetchError = { status: 500, message: "fail" };
    mockFollowUser.mockRejectedValue(err);

    const { result } = renderHook(() => useUserProfileFollowMutate(targetUid), {
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

  it("onSettled에서 myProfileQueryKey와 myFollowingsQueryKey만 invalidateQueries 호출", async () => {
    mockFollowUser.mockResolvedValue({ message: "ok" });

    const { result } = renderHook(() => useUserProfileFollowMutate(targetUid), {
      wrapper
    });

    act(() => {
      result.current.userFollowMutate();
    });

    await waitFor(() => {
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: myProfileQueryKey
      });
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: myFollowingsQueryKey
      });

      // ❌ target invalidate는 현재 훅에서 안 함
      expect(invalidateSpy).not.toHaveBeenCalledWith({
        queryKey: targetProfileQueryKey
      });
      expect(invalidateSpy).not.toHaveBeenCalledWith({
        queryKey: targetFollowersQueryKey
      });
      expect(invalidateSpy).not.toHaveBeenCalledWith({
        queryKey: targetFollowingsQueryKey
      });
    });
  });
});
