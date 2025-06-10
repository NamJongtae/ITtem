import { renderHook, act } from "@testing-library/react";
import useFollowUserInProfile from "../../../hooks/useFollowUserInProfile";
import useUserProfileFollowMutate from "../../../hooks/mutations/useUserProfileFollowMutate";
import useUserProfileUnfollowMutate from "../../../hooks/mutations/useUserProfileUnfollowMutate";
import { queryKeys } from "@/shared/common/query-keys/queryKeys";
import { toast } from "react-toastify";
import { ProfileData } from "../../../types/profileTypes";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";

jest.mock("../../../hooks/mutations/useUserProfileFollowMutate");
jest.mock("../../../hooks/mutations/useUserProfileUnfollowMutate");
jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  }
}));

describe("useFollowUserInProfile 훅 테스트", () => {
  const { Wrapper: wrapper, queryClient } = createQueryClientWrapper();

  const mockMyUid = "user-123";
  const mockTargetUid = "user-456";

  const myProfileData: ProfileData = {
    uid: mockMyUid,
    followings: [mockTargetUid]
  } as ProfileData;

  const profileData: ProfileData = {
    uid: mockTargetUid,
    followers: [mockMyUid]
  } as ProfileData;

  const userFollowMutate = jest.fn();
  const userUnfollowMutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    queryClient.setQueryData(queryKeys.profile.my.queryKey, myProfileData);

    (useUserProfileFollowMutate as jest.Mock).mockReturnValue({
      userFollowMutate
    });
    (useUserProfileUnfollowMutate as jest.Mock).mockReturnValue({
      userUnfollowMutate
    });
  });

  it("isFollow는 나의 프로필 followings 목록에 상대방 uid가 있고, 상대방의 followers 목록에 나의 uid가 있는 경우 true가 됩니다.", () => {
       // 기본값에서 isFollow true로 설정됨
    const { result } = renderHook(
      () => useFollowUserInProfile({ profileData }),
      { wrapper }
    );

    expect(result.current.isFollow).toBe(true);
  });

  it("myProfileData.uid와 profileData.uid가 다르면 isNotMyProfile은 true가 됩니다.", () => {
    // 기본값에서 myProfileData.uid와 profileData.uid가 다르게 설정됨
    const { result } = renderHook(
      () => useFollowUserInProfile({ profileData }),
      { wrapper }
    );

    expect(result.current.isFollow).toBe(true);
  });

  it("isFollow가 true일 때 followHandler 호출 시 userUnfollowMutate를 호출합니다.", () => {
    const { result } = renderHook(
      () => useFollowUserInProfile({ profileData }),
      { wrapper }
    );

    act(() => {
      result.current.followHandler();
    });

    expect(userUnfollowMutate).toHaveBeenCalled();
    expect(userFollowMutate).not.toHaveBeenCalled();
  });

  it("isFollow가 false일 때 followHandler 호출 시 userFollowMutate를 호출합니다.", () => {
    const profileDataNotFollowed = {
      uid: mockTargetUid,
      followers: [""]
    } as ProfileData;

    const { result } = renderHook(
      () => useFollowUserInProfile({ profileData: profileDataNotFollowed }),
      { wrapper }
    );

    act(() => {
      result.current.followHandler();
    });

    expect(userFollowMutate).toHaveBeenCalled();
    expect(userUnfollowMutate).not.toHaveBeenCalled();
  });

  it("myProfileData가 없을 경우 toast.warn이 호출됩니다.", () => {
    queryClient.setQueryData(queryKeys.profile.my.queryKey, null);

    const { result } = renderHook(
      () => useFollowUserInProfile({ profileData }),
      { wrapper }
    );

    act(() => {
      result.current.followHandler();
    });

    expect(toast.warn).toHaveBeenCalledWith("로그인이 필요해요.");
    expect(userFollowMutate).not.toHaveBeenCalled();
    expect(userUnfollowMutate).not.toHaveBeenCalled();
  });
});
