import { renderHook, act } from "@testing-library/react";
import useExitChatRoomMutate from "@/domains/chat/room/hooks/mutations/useExitChatRoomMutate";
import exitChatRoom from "@/domains/chat/room/api/exitChatRoom";
import useGlobalLoadingStore from "@/shared/common/store/globalLogingStore";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { AxiosError } from "axios";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";

jest.mock("next/navigation", () => ({
  useParams: jest.fn()
}));

jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  }
}));

jest.mock("@/shared/common/store/globalLogingStore");

jest.mock("@/domains/chat/room/api/exitChatRoom");

describe("useExitChatRoomMutate 훅 테스트", () => {
  const { Wrapper: wrapper } = createQueryClientWrapper();
  const mockChatRoomId = "room123";
  const mockStartLoading = jest.fn();
  const mockStopLoading = jest.fn();
  const mockExitChatRoom = exitChatRoom as jest.Mock;
  const mockUseParams = useParams as jest.Mock;
  const mockuseGlobalLoadingStore =
    useGlobalLoadingStore as unknown as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseParams.mockReturnValue({ chatRoomId: mockChatRoomId });

    mockuseGlobalLoadingStore.mockReturnValue({
      actions: {
        startLoading: mockStartLoading,
        stopLoading: mockStopLoading
      }
    });
  });

  it("exitChatRoom 호출 시 startLoading, stopLoading이 호출됩니다.", async () => {
    mockExitChatRoom.mockResolvedValueOnce({
      data: { message: "나가기 완료" }
    });

    const { result } = renderHook(() => useExitChatRoomMutate(), { wrapper });

    await act(async () => {
      await result.current.exitChatRoomMutate();
    });

    expect(mockStartLoading).toHaveBeenCalled();
    expect(mockExitChatRoom).toHaveBeenCalledWith(mockChatRoomId);
    expect(mockStopLoading).toHaveBeenCalled();
  });

  it("exitChatRoom 호출 실패 시 toast.warn 호출되고 메세지가 출력됩니다.", async () => {
    const error = new AxiosError("Error");
    mockExitChatRoom.mockRejectedValueOnce(error);

    const { result } = renderHook(() => useExitChatRoomMutate(), { wrapper });

    await act(async () => {
      await result.current.exitChatRoomMutate().catch(() => {});
    });

    expect(mockStartLoading).toHaveBeenCalled();
    expect(mockExitChatRoom).toHaveBeenCalledWith(mockChatRoomId);
    expect(toast.warn).toHaveBeenCalledWith("채팅방 나가기에 실패했어요.");
    expect(mockStopLoading).toHaveBeenCalled();
  });
});
