import { renderHook, act } from "@testing-library/react";
import useChatRoomLogic from "../../../hooks/useChatRoomLogic";
import useChatRoomSubscription from "../../../hooks/useChatRoomSubscription";

jest.mock("../../../hooks/useChatRoomSubscription");

describe("useChatRoomLogic 훅 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("초기값이 올바르게 설정되어야 합니다.", () => {
    const { result } = renderHook(() => useChatRoomLogic());

    expect(result.current.chatData).toBeNull();
    expect(result.current.messages).toEqual([]);
    expect(result.current.isLoading).toBe(true);
    expect(typeof result.current.handleChatRoomExit).toBe("function");
    expect(typeof result.current.resetChatRoomExit).toBe("function");
    expect(result.current.chatListRef.current).toBeNull();
  });

  it("handleChatRoomExit을 호출하면 isExit이 true로 설정되어야 합니다.", () => {
    const { result } = renderHook(() => useChatRoomLogic());

    act(() => {
      result.current.handleChatRoomExit();
    });

    // 내부 상태라 직접 접근은 불가하지만
    // useChatRoomSubscription에 전달된 값으로 확인
    expect(useChatRoomSubscription).toHaveBeenCalledWith(
      expect.objectContaining({ isExit: true })
    );
  });

  it("resetChatRoomExit을 호출하면 isExit이 false로 설정되어야 합니다.", () => {
    const { result } = renderHook(() => useChatRoomLogic());

    act(() => {
      result.current.resetChatRoomExit();
    });

    expect(useChatRoomSubscription).toHaveBeenLastCalledWith(
      expect.objectContaining({ isExit: false })
    );
  });

  it("useChatRoomSubscription이 호출되어야 합니다.", () => {
    renderHook(() => useChatRoomLogic());

    expect(useChatRoomSubscription).toHaveBeenCalledWith(
      expect.objectContaining({
        isExit: false,
        setChatData: expect.any(Function),
        setMessages: expect.any(Function),
        setIsLoading: expect.any(Function)
      })
    );
  });
});
