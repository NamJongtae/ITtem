import { renderHook, act } from "@testing-library/react";
import useDeleteChatRoomMutate from "@/domains/chat/room/hooks/mutations/useDeleteChatRoomMutate";
import deleteChatRoom from "@/domains/chat/room/api/deleteChatRoom";
import useGlobalLoadingStore from "@/shared/common/store/globalLogingStore";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";

jest.mock("next/navigation");
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    warn: jest.fn()
  }
}));
jest.mock("@/shared/common/store/globalLogingStore");
jest.mock("@/domains/chat/room/api/deleteChatRoom");

describe("useDeleteChatRoomMutate 훅 테스트", () => {
  const wrapper = createQueryClientWrapper();
  const mockChatRoomId = "room123";
  const mockStartLoading = jest.fn();
  const mockStopLoading = jest.fn();
  const mockDeleteChatRoom = deleteChatRoom as jest.Mock;
  const mockUseGlobalLoadingStore =
    useGlobalLoadingStore as unknown as jest.Mock;
  const mockUseParams = useParams as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseParams.mockReturnValue({ chatRoomId: mockChatRoomId });

    mockUseGlobalLoadingStore.mockReturnValue({
      actions: {
        startLoading: mockStartLoading,
        stopLoading: mockStopLoading
      }
    });
  });

  it("삭제 성공 시 startLoading, stopLoading, toast.success 호출하고 메시지를 출력합니다.", async () => {
    mockDeleteChatRoom.mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useDeleteChatRoomMutate(), { wrapper });

    await act(async () => {
      await result.current.deleteChatRoomMutate();
    });

    expect(mockStartLoading).toHaveBeenCalled();
    expect(mockDeleteChatRoom).toHaveBeenCalledWith(mockChatRoomId);
    expect(toast.success).toHaveBeenCalledWith(
      "채팅방 인원이 없어 채팅방이 삭제됬어요."
    );
    expect(mockStopLoading).toHaveBeenCalled();
  });

  it("삭제 실패 시 startLoading, stopLoading, toast.warn 호출하고 메세지를 출력합니다.", async () => {
    mockDeleteChatRoom.mockRejectedValueOnce(new Error("API Error"));

    const { result } = renderHook(() => useDeleteChatRoomMutate(), { wrapper });

    await act(async () => {
      await result.current.deleteChatRoomMutate().catch(() => {});
    });

    expect(mockStartLoading).toHaveBeenCalled();
    expect(mockDeleteChatRoom).toHaveBeenCalledWith(mockChatRoomId);
    expect(toast.warn).toHaveBeenCalledWith("채팅방 삭제에 실패했어요.");
    expect(mockStopLoading).toHaveBeenCalled();
  });
});
