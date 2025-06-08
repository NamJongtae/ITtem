import { renderHook, act } from "@testing-library/react";
import useSendChatMessageMutate from "../../../../hooks/mutations/useSendChatMessageMutate";
import sendChatMessage from "@/domains/chat/room/api/sendChatMessage";
import { toast } from "react-toastify";
import { AxiosHeaders } from "axios";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";

jest.mock("@/domains/chat/room/api/sendChatMessage");
jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  }
}));

describe("useSendChatMessageMutate 훅 테스트", () => {
  const wrapper = createQueryClientWrapper();
  const mockChatRoomId = "room123";
  const mockSendChatMessage = sendChatMessage as jest.Mock;
  const mockScrollToBottom = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("성공적으로 메시지를 전송하면 scrollToBottom이 호출됩니다.", async () => {
    mockSendChatMessage.mockResolvedValueOnce({
      data: { message: "전송 완료" }
    });

    const { result } = renderHook(
      () => useSendChatMessageMutate(mockScrollToBottom),
      { wrapper }
    );

    await act(async () => {
      result.current.mutate({ chatRoomId: mockChatRoomId, message: "안녕!" });
    });

    expect(mockSendChatMessage).toHaveBeenCalledWith({
      chatRoomId: mockChatRoomId,
      message: "안녕!"
    });
    expect(mockScrollToBottom).toHaveBeenCalled();
  });

  it("에러 발생 시 toast.warn이 호출됩니다.", async () => {
    const axiosError = {
      isAxiosError: true,
      response: {
        status: 400,
        statusText: "Bad Request",
        headers: {},
        config: {
          headers: new AxiosHeaders()
        },
        data: { message: "메시지 전송 실패" }
      }
    };

    mockSendChatMessage.mockRejectedValueOnce(axiosError);

    const { result } = renderHook(
      () => useSendChatMessageMutate(mockScrollToBottom),
      { wrapper }
    );

    await act(async () => {
      result.current.mutate({
        chatRoomId: mockChatRoomId,
        message: "실패 메시지"
      });
    });

    expect(toast.warn).toHaveBeenCalledWith("메시지 전송 실패");
  });
});
