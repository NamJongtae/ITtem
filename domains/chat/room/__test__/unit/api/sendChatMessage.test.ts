import sendChatMessage from "../../../api/sendChatMessage";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import { ApiResponse } from "@/shared/common/types/responseTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("sendChatMessage", () => {
  const mockChatRoomId = "chat-room-123";
  const mockMessage = "안녕하세요!";

  const mockResponse: AxiosResponse<ApiResponse> = {
    data: {
      message: "메시지가 전송에 성공했어요."
    },
    status: 200,
    statusText: "ok",
    headers: {},
    config: {
      headers: new AxiosHeaders()
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("chatRoomId와 message를 포함한 POST 요청을 보내고 응답을 받습니다.", async () => {
    (customAxios.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await sendChatMessage({
      chatRoomId: mockChatRoomId,
      message: mockMessage
    });

    expect(customAxios.post).toHaveBeenCalledWith(
      `/api/chat/${mockChatRoomId}/message`,
      { message: mockMessage }
    );
    expect(result).toEqual(mockResponse);
  });

  it("요청 중 에러가 발생하면 예외를 던집니다.", async () => {
    const error = new Error(
      "메시지 전송에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
    (customAxios.post as jest.Mock).mockRejectedValue(error);

    await expect(
      sendChatMessage({ chatRoomId: mockChatRoomId, message: mockMessage })
    ).rejects.toThrow("메시지 전송에 실패했어요.\n잠시 후 다시 시도해주세요.");
  });
});
