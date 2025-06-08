import { renderHook, act } from "@testing-library/react";
import useFollowUserInProduct from "../../../hooks/useFollowUserInProduct";
import useProductDetailFollowMutate from "../../../hooks/mutations/useProductDetailFollowMutate";
import useProductDetailUnfollowMutate from "../../../hooks/mutations/useProductDetailUnfollowMutate";
import { ProfileData } from "@/domains/user/profile/types/profileTypes";

jest.mock("../../../hooks/mutations/useProductDetailFollowMutate");
jest.mock("../../../hooks/mutations/useProductDetailUnfollowMutate");

describe("useFollowUserInProduct 훅 테스트", () => {
  const mockFollowMutate = jest.fn();
  const mockUnfollowMutate = jest.fn();
  const mockProfile: ProfileData = {
    uid: "myUid",
    followings: ["user123"]
  } as ProfileData;

  beforeEach(() => {
    jest.clearAllMocks();

    (useProductDetailFollowMutate as jest.Mock).mockReturnValue({
      productDetailfollowMutate: mockFollowMutate
    });

    (useProductDetailUnfollowMutate as jest.Mock).mockReturnValue({
      productDetailUnfollowMutate: mockUnfollowMutate
    });
  });

  it("내 프로필일 경우 isMyProfile이 true여야 합니다.", () => {
    const { result } = renderHook(() =>
      useFollowUserInProduct({
        uid: "myUid",
        authFollowers: [],
        myProfileData: mockProfile
      })
    );

    expect(result.current.isMyProfile).toBe(true);
  });

  it("팔로우 상태가 아니면 followMutate가 호출되어야 합니다.", () => {
    const { result } = renderHook(() =>
      useFollowUserInProduct({
        uid: "newUser",
        authFollowers: [],
        myProfileData: mockProfile
      })
    );

    expect(result.current.isFollowing).toBe(false);

    act(() => {
      result.current.followHandler();
    });

    expect(mockFollowMutate).toHaveBeenCalled();
  });

  it("팔로우 상태이면 unfollowMutate가 호출되어야 합니다.", () => {
    const { result } = renderHook(() =>
      useFollowUserInProduct({
        uid: "user123", // 이건 mockProfile.followings에 포함됨
        authFollowers: ["myUid"], // myUid가 팔로워로 포함됨
        myProfileData: mockProfile
      })
    );

    expect(result.current.isFollowing).toBe(true);

    act(() => {
      result.current.followHandler();
    });

    expect(mockUnfollowMutate).toHaveBeenCalled();
  });
});
