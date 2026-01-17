import { renderHook, act } from "@testing-library/react";
import useFollowUserInProfile from "../../../hooks/useFollowUserInProfile";
import useUserProfileFollowMutate from "../../../hooks/mutations/useUserProfileFollowMutate";
import useUserProfileUnfollowMutate from "../../../hooks/mutations/useUserProfileUnfollowMutate";
import { toast } from "react-toastify";
import { ProfileData } from "../../../types/profileTypes";

jest.mock("../../../hooks/mutations/useUserProfileFollowMutate");
jest.mock("../../../hooks/mutations/useUserProfileUnfollowMutate");
jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  }
}));

describe("useFollowUserInProfile 훅 테스트", () => {
  const mockMyUid = "user-123";
  const mockTargetUid = "user-456";

  const myProfileData: ProfileData = { uid: mockMyUid } as ProfileData;

  const userFollowMutate = jest.fn();
  const userUnfollowMutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useUserProfileFollowMutate as jest.Mock).mockReturnValue({
      userFollowMutate
    });
    (useUserProfileUnfollowMutate as jest.Mock).mockReturnValue({
      userUnfollowMutate
    });
  });

  it("myProfileData.uid와 profileData.uid가 다르면 isNotMyProfile은 true가 됩니다.", () => {
    const profileData: ProfileData = {
      uid: mockTargetUid
    } as ProfileData;

    const { result } = renderHook(() =>
      useFollowUserInProfile({ profileData, myProfileData, isFollow: false })
    );

    expect(result.current.isNotMyProfile).toBe(true);
  });

  it("myProfileData.uid와 profileData.uid가 같으면 isNotMyProfile은 false가 됩니다.", () => {
    const profileData: ProfileData = {
      uid: mockMyUid
    } as ProfileData;

    const { result } = renderHook(() =>
      useFollowUserInProfile({ profileData, myProfileData, isFollow: false })
    );

    expect(result.current.isNotMyProfile).toBe(false);
  });

  it("isFollow가 true일 때 followHandler 호출 시 userUnfollowMutate를 호출합니다.", () => {
    const profileData: ProfileData = {
      uid: mockTargetUid
    } as ProfileData;

    const { result } = renderHook(() =>
      useFollowUserInProfile({ profileData, myProfileData, isFollow: true })
    );

    act(() => {
      result.current.followHandler();
    });

    expect(userUnfollowMutate).toHaveBeenCalledTimes(1);
    expect(userFollowMutate).not.toHaveBeenCalled();
  });

  it("isFollow가 false일 때 followHandler 호출 시 userFollowMutate를 호출합니다.", () => {
    const profileData: ProfileData = {
      uid: mockTargetUid
    } as ProfileData;

    const { result } = renderHook(() =>
      useFollowUserInProfile({ profileData, myProfileData, isFollow: false })
    );

    act(() => {
      result.current.followHandler();
    });

    expect(userFollowMutate).toHaveBeenCalledTimes(1);
    expect(userUnfollowMutate).not.toHaveBeenCalled();
  });

  it("isFollow가 undefined여도 followHandler 호출 시 userFollowMutate를 호출합니다.", () => {
    const profileData: ProfileData = {
      uid: mockTargetUid
    } as ProfileData;

    const { result } = renderHook(() =>
      useFollowUserInProfile({
        profileData,
        myProfileData,
        isFollow: undefined
      })
    );

    act(() => {
      result.current.followHandler();
    });

    expect(userFollowMutate).toHaveBeenCalledTimes(1);
    expect(userUnfollowMutate).not.toHaveBeenCalled();
  });

  it("myProfileData가 없을 경우 toast.warn이 호출되고 mutate는 호출되지 않습니다.", () => {
    const profileData: ProfileData = {
      uid: mockTargetUid
    } as ProfileData;

    const { result } = renderHook(() =>
      useFollowUserInProfile({
        profileData,
        myProfileData: undefined,
        isFollow: false
      })
    );

    act(() => {
      result.current.followHandler();
    });

    expect(toast.warn).toHaveBeenCalledWith("로그인이 필요해요.");
    expect(userFollowMutate).not.toHaveBeenCalled();
    expect(userUnfollowMutate).not.toHaveBeenCalled();
  });

  it("profileData가 undefined여도 myProfileData가 없으면 toast.warn이 호출됩니다.", () => {
    const { result } = renderHook(() =>
      useFollowUserInProfile({
        profileData: undefined,
        myProfileData: undefined,
        isFollow: false
      })
    );

    act(() => {
      result.current.followHandler();
    });

    expect(toast.warn).toHaveBeenCalledWith("로그인이 필요해요.");
    expect(userFollowMutate).not.toHaveBeenCalled();
    expect(userUnfollowMutate).not.toHaveBeenCalled();
  });
});
