import { renderHook, act } from "@testing-library/react";
import useFollowUserInList from "../../../hooks/useFollowUserInList";
import useMyProfileFollowMutate from "../../../hooks/mutations/useMyProfileFollowMutate";
import useMyProfileUnfollowMutate from "../../../hooks/mutations/useMyProfileUnfollowMutate";
import useUserProfileFollowMutate from "../../../hooks/mutations/useUserProfileFollowMutate";
import useUserProfileUnfollowMutate from "../../../hooks/mutations/useUserProfileUnfollowMutate";

import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { toast } from "react-toastify";
import { useGetQuerys } from "@/shared/common/hooks/useGetQuerys";
import { ProfileData } from "../../../types/profileTypes";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";

jest.mock("../../../hooks/mutations/useMyProfileFollowMutate");
jest.mock("../../../hooks/mutations/useMyProfileUnfollowMutate");
jest.mock("../../../hooks/mutations/useUserProfileFollowMutate");
jest.mock("../../../hooks/mutations/useUserProfileUnfollowMutate");
jest.mock("@/shared/common/hooks/useGetQuerys");
jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  }
}));

describe("useFollowUserInList 훅 테스트", () => {
  const { Wrapper: wrapper, queryClient } = createQueryClientWrapper();

  const mockFollowUserId = "user-456";
  const mockMyUid = "user-123";

  const myProfileData: ProfileData = {
    uid: mockMyUid,
    followings: [mockFollowUserId]
  } as ProfileData;

  const followProfileData: ProfileData = {
    uid: mockFollowUserId,
    followers: [mockMyUid]
  } as ProfileData;

  const myProfilefollowMutate = jest.fn();
  const myProfileUnfollowMutate = jest.fn();
  const userFollowMutate = jest.fn();
  const userUnfollowMutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    queryClient.setQueryData(queryKeys.profile.my.queryKey, myProfileData);

    (useMyProfileFollowMutate as jest.Mock).mockReturnValue({
      myProfilefollowMutate
    });
    (useMyProfileUnfollowMutate as jest.Mock).mockReturnValue({
      myProfileUnfollowMutate
    });
    (useUserProfileFollowMutate as jest.Mock).mockReturnValue({
      userFollowMutate
    });
    (useUserProfileUnfollowMutate as jest.Mock).mockReturnValue({
      userUnfollowMutate
    });

    (useGetQuerys as jest.Mock).mockReturnValue({ uid: null }); // not my profile page
  });

  it("isFollow는 나의 프로필 followings 목록에 상대방 uid가 있고, 상대방의 followers 목록에 나의 uid가 있는 경우 true가 됩니다.", () => {
    // 기본 followProfileData에는 followers 목록에 나의 uid가 포함됨
    // 기본 mockMyProfile followings 목록에 상대 유저 uid가 포함됨
    const { result } = renderHook(
      () => useFollowUserInList({ followProfileData }),
      { wrapper }
    );

    expect(result.current.isFollow).toBe(true);
  });

  it("myProfileData.uid와 profileData.uid가 다르면 isNotMyProfile은 true가 됩니다.", () => {
    // 기본값에서 myProfileData.uid와 profileData.uid가 다르게 설정됨
    const { result } = renderHook(
      () => useFollowUserInList({ followProfileData }),
      { wrapper }
    );

    expect(result.current.isNotMyProfile).toBe(true);
  });

  it("isFollow true, isMyProfile이 true일 때 onClickFollow 호출 시 myProfileUnfollowMutate를 호출합니다.", () => {
    // uid query 존재 시 isMyProfile true
    (useGetQuerys as jest.Mock).mockReturnValue({ uid: mockMyUid });
    const { result } = renderHook(
      () => useFollowUserInList({ followProfileData }),
      { wrapper }
    );

    act(() => {
      result.current.onClickFollow();
    });

    expect(myProfileUnfollowMutate).toHaveBeenCalled();
  });

  it("isFollow true, isMyProfile이 false 때 onClickFollow 호출 시 userUnfollowMutate를 호출합니다.", () => {
    const { result } = renderHook(
      () => useFollowUserInList({ followProfileData }),
      { wrapper }
    );

    act(() => {
      result.current.onClickFollow();
    });

    expect(userUnfollowMutate).toHaveBeenCalled();
  });

  it("isFollow false, isMyProfile이 true일 때 onClickFollow 호출 시 myProfilefollowMutate를 호출합니다.", () => {
    // uid query 존재 시 isMyProfile true
    (useGetQuerys as jest.Mock).mockReturnValue({ uid: mockMyUid });
    // 나의 프로필 followings 목록에 상대 uid 없음
    const myProfileData: ProfileData = {
      uid: mockMyUid,
      followings: [""]
    } as ProfileData;

    queryClient.setQueryData(queryKeys.profile.my.queryKey, myProfileData);

    // 상대방 프로필 followers 목록에 나의 uid 없음
    const followProfileData = {
      uid: mockFollowUserId,
      followers: ["user123"]
    } as ProfileData;
    const { result } = renderHook(
      () => useFollowUserInList({ followProfileData }),
      { wrapper }
    );

    act(() => {
      result.current.onClickFollow();
    });

    expect(myProfilefollowMutate).toHaveBeenCalled();
  });

  it("isFollow false일 때 isMyProfile이 false일 때 onClickFollow는 userFollowMutate를 호출합니다. ()", () => {
    // 나의 프로필 followings 목록에 상대 uid 없음
    const myProfileData: ProfileData = {
      uid: mockMyUid,
      followings: [""]
    } as ProfileData;

    queryClient.setQueryData(queryKeys.profile.my.queryKey, myProfileData);

    // 상대방 프로필 followers 목록에 나의 uid 없음
    const followProfileData = {
      uid: mockFollowUserId,
      followers: ["user123"]
    } as ProfileData;

    const { result } = renderHook(
      () => useFollowUserInList({ followProfileData }),
      { wrapper }
    );

    act(() => {
      result.current.onClickFollow();
    });

    expect(userFollowMutate).toHaveBeenCalled();
  });

  it("로그인 안 된 경우 toast.warn이 호출됩니다.", () => {
    queryClient.setQueryData(queryKeys.profile.my.queryKey, null);

    const { result } = renderHook(
      () => useFollowUserInList({ followProfileData }),
      { wrapper }
    );

    act(() => {
      result.current.onClickFollow();
    });

    expect(toast.warn).toHaveBeenCalledWith("로그인이 필요해요.");
  });
});
