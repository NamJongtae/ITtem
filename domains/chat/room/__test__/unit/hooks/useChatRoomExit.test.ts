import { renderHook, act } from "@testing-library/react";
import useChatRoomExit from "../../../hooks/useChatRoomExit";
import useExitChatRoomMutate from "../../../hooks/mutations/useExitChatRoomMutate";
import useDeleteChatRoomMutate from "../../../hooks/mutations/useDeleteChatRoomMutate";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

jest.mock("next/navigation");
jest.mock("axios", () => ({
  ...jest.requireActual("axios"),
  isAxiosError: () => true
}));
jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  }
}));

jest.mock("../../../hooks/mutations/useExitChatRoomMutate");
jest.mock("../../../hooks/mutations/useDeleteChatRoomMutate");

describe("useChatRoomExit 훅 테스트", () => {
  const mockExitChatRoomMutate = jest.fn();
  const mockDeleteChatRoomMutate = jest.fn();
  const mockPush = jest.fn();
  const mockToastWarn = toast.warn as jest.Mock;
  const handleChatRoomExit = jest.fn();
  const resetChatRoomExit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush
    });

    (useExitChatRoomMutate as jest.Mock).mockReturnValue({
      exitChatRoomMutate: mockExitChatRoomMutate
    });

    (useDeleteChatRoomMutate as jest.Mock).mockReturnValue({
      deleteChatRoomMutate: mockDeleteChatRoomMutate
    });
  });

  it("사용자가 confirm 취소할 경우 아무 함수도 호출되지 않습니다.", async () => {
    global.confirm = jest.fn(() => false);

    const { result } = renderHook(() =>
      useChatRoomExit({
        participantIDs: ["uid1", "uid2"],
        handleChatRoomExit,
        resetChatRoomExit
      })
    );

    await act(async () => {
      await result.current.exitChatRoom();
    });

    expect(handleChatRoomExit).not.toHaveBeenCalled();
    expect(mockExitChatRoomMutate).not.toHaveBeenCalled();
    expect(mockDeleteChatRoomMutate).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("참여자가 2명 이상일 때 exitChatRoomMutate만 호출됩니다.", async () => {
    global.confirm = jest.fn(() => true);

    const { result } = renderHook(() =>
      useChatRoomExit({
        participantIDs: ["uid1", "uid2"],
        handleChatRoomExit,
        resetChatRoomExit
      })
    );

    await act(async () => {
      await result.current.exitChatRoom();
    });

    expect(handleChatRoomExit).toHaveBeenCalled();
    expect(mockExitChatRoomMutate).toHaveBeenCalled();
    expect(mockDeleteChatRoomMutate).not.toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith("/chat");
  });

  it("참여자가 1명일 때 exitChatRoomMutate, deleteChatRoomMutate 모두 호출됩니다.", async () => {
    global.confirm = jest.fn(() => true);

    const { result } = renderHook(() =>
      useChatRoomExit({
        participantIDs: ["onlyUser"],
        handleChatRoomExit,
        resetChatRoomExit
      })
    );

    await act(async () => {
      await result.current.exitChatRoom();
    });

    expect(handleChatRoomExit).toHaveBeenCalled();
    expect(mockExitChatRoomMutate).toHaveBeenCalled();
    expect(mockDeleteChatRoomMutate).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith("/chat");
  });

  it("에러 발생 시 resetChatRoomExit과 toast.warn 에러 메세지가  출력됩니다.", async () => {
    global.confirm = jest.fn(() => true);
    mockExitChatRoomMutate.mockRejectedValue({
      response: { data: { message: "에러 발생" } }
    });

    const { result } = renderHook(() =>
      useChatRoomExit({
        participantIDs: ["uid1", "uid2"],
        handleChatRoomExit,
        resetChatRoomExit
      })
    );

    await act(async () => {
      await result.current.exitChatRoom();
    });

    expect(mockToastWarn).toHaveBeenCalledWith("에러 발생");
    expect(resetChatRoomExit).toHaveBeenCalled();
  });
});
