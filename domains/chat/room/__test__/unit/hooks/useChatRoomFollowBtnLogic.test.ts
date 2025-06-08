import { renderHook, act } from "@testing-library/react";
import useChatRoomFollowBtnLogic from "../../../hooks/useChatRoomFollowBtnLogic";
import useMyProfileFollowMutate from "@/domains/user/profile/hooks/mutations/useMyProfileFollowMutate";
import useMyProfileUnfollowMutate from "@/domains/user/profile/hooks/mutations/useMyProfileUnfollowMutate";

jest.mock("@/domains/user/profile/hooks/mutations/useMyProfileFollowMutate");
jest.mock("@/domains/user/profile/hooks/mutations/useMyProfileUnfollowMutate");

describe("useChatRoomFollowBtnLogic 훅 테스트", () => {
  const mockFollowMutate = jest.fn();
  const mockUnfollowMutate = jest.fn();
  const otherUserId = "user123";

  beforeEach(() => {
    jest.clearAllMocks();

    (useMyProfileFollowMutate as jest.Mock).mockReturnValue({
      myProfilefollowMutate: mockFollowMutate
    });

    (useMyProfileUnfollowMutate as jest.Mock).mockReturnValue({
      myProfileUnfollowMutate: mockUnfollowMutate
    });
  });

  it("onClickFollow 호출 시 follow mutate 함수가 실행됩니다.", () => {
    const { result } = renderHook(() =>
      useChatRoomFollowBtnLogic({
        otherUserId,
        myFollowings: []
      })
    );

    act(() => {
      result.current.onClickFollow();
    });

    expect(mockFollowMutate).toHaveBeenCalled();
  });

  it("onClickUnfollow 호출 시 unfollow mutate 함수가 실행됩니다.", () => {
    const { result } = renderHook(() =>
      useChatRoomFollowBtnLogic({
        otherUserId,
        myFollowings: [otherUserId]
      })
    );

    act(() => {
      result.current.onClickUnfollow();
    });

    expect(mockUnfollowMutate).toHaveBeenCalled();
  });

  it("myFollowings에 otherUserId가 포함되어 있으면 isFollow는 true가 됩니다.", () => {
    const { result } = renderHook(() =>
      useChatRoomFollowBtnLogic({
        otherUserId,
        myFollowings: [otherUserId, "user456"]
      })
    );

    expect(result.current.isFollow).toBe(true);
  });

  it("myFollowings에 otherUserId가 없으면 isFollow는 false가 됩니다.", () => {
    const { result } = renderHook(() =>
      useChatRoomFollowBtnLogic({
        otherUserId,
        myFollowings: ["user456"]
      })
    );

    expect(result.current.isFollow).toBe(false);
  });

  it("myFollowings가 undefined이면 isFollow는 false가 됩니다.", () => {
    const { result } = renderHook(() =>
      useChatRoomFollowBtnLogic({
        otherUserId,
        myFollowings: undefined
      })
    );

    expect(result.current.isFollow).toBe(false);
  });
});
