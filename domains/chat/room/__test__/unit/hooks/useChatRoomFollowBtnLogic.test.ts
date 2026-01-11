import { renderHook, act } from "@testing-library/react";
import useChatRoomFollowBtnLogic from "../../../hooks/useChatRoomFollowBtnLogic";
import useChatRoomFollowMutate from "../../../hooks/mutations/useChatRoomFollowMutate";
import useChatRoomUnFollowMutate from "../../../hooks/mutations/useChatRoomUnFollowMutate";

jest.mock("../../../hooks/mutations/useChatRoomFollowMutate");
jest.mock("../../../hooks/mutations/useChatRoomUnFollowMutate");

describe("useChatRoomFollowBtnLogic 훅 테스트", () => {
  const mockFollowMutate = jest.fn();
  const mockUnfollowMutate = jest.fn();

  const otherUserId = "user123";

  beforeEach(() => {
    jest.clearAllMocks();

    (useChatRoomFollowMutate as jest.Mock).mockReturnValue({
      userFollowMutate: mockFollowMutate
    });

    (useChatRoomUnFollowMutate as jest.Mock).mockReturnValue({
      userUnFollowMutate: mockUnfollowMutate
    });
  });

  it("onClickFollow 호출 시 userFollowMutate가 실행됩니다.", () => {
    const { result } = renderHook(() =>
      useChatRoomFollowBtnLogic({ otherUserId })
    );

    act(() => {
      result.current.onClickFollow();
    });

    expect(mockFollowMutate).toHaveBeenCalled();
  });

  it("onClickUnfollow 호출 시 userUnFollowMutate가 실행됩니다.", () => {
    const { result } = renderHook(() =>
      useChatRoomFollowBtnLogic({ otherUserId })
    );

    act(() => {
      result.current.onClickUnfollow();
    });

    expect(mockUnfollowMutate).toHaveBeenCalled();
  });

  it("otherUserId가 undefined여도 mutate 함수는 호출됩니다(빈 문자열로 초기화).", () => {
    const { result } = renderHook(() =>
      useChatRoomFollowBtnLogic({ otherUserId: undefined })
    );

    act(() => {
      result.current.onClickFollow();
      result.current.onClickUnfollow();
    });

    expect(mockFollowMutate).toHaveBeenCalled();
    expect(mockUnfollowMutate).toHaveBeenCalled();
  });

  it("mutate 훅들이 otherUserId를 인자로 받습니다.", () => {
    renderHook(() => useChatRoomFollowBtnLogic({ otherUserId }), {});

    expect(useChatRoomFollowMutate).toHaveBeenCalledWith(otherUserId);
    expect(useChatRoomUnFollowMutate).toHaveBeenCalledWith(otherUserId);
  });
});
