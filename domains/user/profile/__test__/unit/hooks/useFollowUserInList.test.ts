import { renderHook, act } from "@testing-library/react";
import useFollowUserInList from "../../../hooks/useFollowUserInList";

import useMyProfileFollowInListMutate from "../../../hooks/mutations/useMyProfileFollowInListMutate";
import useMyProfileUnfollowInListMutate from "../../../hooks/mutations/useMyProfileUnfollowInListMutate";
import useUserProfileFollowInListMutate from "../../../hooks/mutations/useUserProfileFollowInListMutate";
import useUserProfileUnFollowInListMutate from "../../../hooks/mutations/useUserProfileUnFollowInListMutate";

import { toast } from "react-toastify";
import { ProfileData } from "../../../types/profileTypes";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";
import { useParams } from "next/navigation";

jest.mock("../../../hooks/mutations/useMyProfileFollowInListMutate");
jest.mock("../../../hooks/mutations/useMyProfileUnfollowInListMutate");
jest.mock("../../../hooks/mutations/useUserProfileFollowInListMutate");
jest.mock("../../../hooks/mutations/useUserProfileUnFollowInListMutate");

jest.mock("next/navigation", () => ({
  __esModule: true,
  useParams: jest.fn()
}));

jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  }
}));

describe("useFollowUserInList 훅 테스트", () => {
  const { Wrapper: wrapper } = createQueryClientWrapper();

  const mockFollowUserId = "user-456";
  const mockMyUid = "user-123";

  const myProfilefollowMutate = jest.fn();
  const myProfileUnfollowMutate = jest.fn();
  const userFollowMutate = jest.fn();
  const userUnfollowMutate = jest.fn();

  const listType = "followers" as const;

  const myProfileData: ProfileData = {
    uid: mockMyUid
  } as ProfileData;

  beforeEach(() => {
    jest.clearAllMocks();

    (useMyProfileFollowInListMutate as jest.Mock).mockReturnValue({
      myProfilefollowMutate
    });
    (useMyProfileUnfollowInListMutate as jest.Mock).mockReturnValue({
      myProfileUnfollowMutate
    });
    (useUserProfileFollowInListMutate as jest.Mock).mockReturnValue({
      userFollowMutate
    });
    (useUserProfileUnFollowInListMutate as jest.Mock).mockReturnValue({
      userUnfollowMutate
    });

    (useParams as jest.Mock).mockReturnValue({ uid: "someone" });
  });

  it("isFollow는 followProfileData.isFollow 값을 그대로 반환합니다.", () => {
    const followProfileData = {
      uid: mockFollowUserId,
      isFollow: true
    } as any;

    const { result } = renderHook(
      () =>
        useFollowUserInList({
          followProfileData,
          myProfileData,
          listType
        }),
      { wrapper }
    );

    expect(result.current.isFollow).toBe(true);
  });

  it("myProfileData.uid와 followProfileData.uid가 다르면 isNotMyProfile은 true가 됩니다.", () => {
    const followProfileData = {
      uid: mockFollowUserId,
      isFollow: true
    } as any;

    const { result } = renderHook(
      () =>
        useFollowUserInList({
          followProfileData,
          myProfileData,
          listType
        }),
      { wrapper }
    );

    expect(result.current.isNotMyProfile).toBe(true);
  });

  it("isFollow true, isMyProfilePage이 true(uid param 없음)일 때 onClickFollow 호출 시 myProfileUnfollowMutate를 호출합니다.", () => {
    (useParams as jest.Mock).mockReturnValue({});

    const followProfileData = {
      uid: mockFollowUserId,
      isFollow: true
    } as any;

    const { result } = renderHook(
      () =>
        useFollowUserInList({
          followProfileData,
          myProfileData,
          listType
        }),
      { wrapper }
    );

    act(() => {
      result.current.onClickFollow();
    });

    expect(myProfileUnfollowMutate).toHaveBeenCalledTimes(1);
    expect(userUnfollowMutate).not.toHaveBeenCalled();
  });

  it("isFollow true, isMyProfilePage이 false(uid param 있음)일 때 onClickFollow 호출 시 userUnfollowMutate를 호출합니다.", () => {
    const followProfileData = {
      uid: mockFollowUserId,
      isFollow: true
    } as any;

    const { result } = renderHook(
      () =>
        useFollowUserInList({
          followProfileData,
          myProfileData,
          listType
        }),
      { wrapper }
    );

    act(() => {
      result.current.onClickFollow();
    });

    expect(userUnfollowMutate).toHaveBeenCalledTimes(1);
    expect(myProfileUnfollowMutate).not.toHaveBeenCalled();
  });

  it("isFollow false, isMyProfilePage이 true(uid param 없음)일 때 onClickFollow 호출 시 myProfilefollowMutate를 호출합니다.", () => {
    (useParams as jest.Mock).mockReturnValue({});

    const followProfileData = {
      uid: mockFollowUserId,
      isFollow: false
    } as any;

    const { result } = renderHook(
      () =>
        useFollowUserInList({
          followProfileData,
          myProfileData,
          listType
        }),
      { wrapper }
    );

    act(() => {
      result.current.onClickFollow();
    });

    expect(myProfilefollowMutate).toHaveBeenCalledTimes(1);
    expect(userFollowMutate).not.toHaveBeenCalled();
  });

  it("isFollow false, isMyProfilePage이 false(uid param 있음)일 때 onClickFollow 호출 시 userFollowMutate를 호출합니다.", () => {
    const followProfileData = {
      uid: mockFollowUserId,
      isFollow: false
    } as any;

    const { result } = renderHook(
      () =>
        useFollowUserInList({
          followProfileData,
          myProfileData,
          listType
        }),
      { wrapper }
    );

    act(() => {
      result.current.onClickFollow();
    });

    expect(userFollowMutate).toHaveBeenCalledTimes(1);
    expect(myProfilefollowMutate).not.toHaveBeenCalled();
  });

  it("로그인 안 된 경우(myProfileData 없음) toast.warn이 호출되고 mutate는 호출되지 않습니다.", () => {
    const followProfileData = {
      uid: mockFollowUserId,
      isFollow: false
    } as any;

    const { result } = renderHook(
      () =>
        useFollowUserInList({
          followProfileData,
          myProfileData: undefined,
          listType
        }),
      { wrapper }
    );

    act(() => {
      result.current.onClickFollow();
    });

    expect(toast.warn).toHaveBeenCalledWith("로그인이 필요해요.");
    expect(myProfilefollowMutate).not.toHaveBeenCalled();
    expect(myProfileUnfollowMutate).not.toHaveBeenCalled();
    expect(userFollowMutate).not.toHaveBeenCalled();
    expect(userUnfollowMutate).not.toHaveBeenCalled();
  });
});
