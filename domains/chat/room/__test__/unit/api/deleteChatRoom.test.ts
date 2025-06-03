import deleteChatRoom from "../../../api/deleteChatRoom";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import { ApiResponse } from "@/shared/common/types/responseTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("deleteChatRoom API 함수 테스트", () => {
  const mockChatRoomId = "chat-room-123";

  const mockResponse: AxiosResponse<ApiResponse> = {
    data: {
      message: "채팅방 삭제에 성공했어요."
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

  it("chatRoomId를 포함하여 DELETE 요청을 보내고 응답을 받습니다.", async () => {
    (customAxios.delete as jest.Mock).mockResolvedValue(mockResponse);

    const result = await deleteChatRoom(mockChatRoomId);

    expect(customAxios.delete).toHaveBeenCalledWith(
      `/api/chat/${mockChatRoomId}`
    );
    expect(result).toEqual(mockResponse);
  });

  it("요청 중 에러가 발생하면 예외를 던집니다.", async () => {
    const error = new Error(
      "채팅방 삭제에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
    (customAxios.delete as jest.Mock).mockRejectedValue(error);

    await expect(deleteChatRoom(mockChatRoomId)).rejects.toThrow(
      "채팅방 삭제에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
  });
});
