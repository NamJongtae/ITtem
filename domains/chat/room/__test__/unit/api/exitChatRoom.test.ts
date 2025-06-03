import exitChatRoom from "../../../api/exitChatRoom";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import { ApiResponse } from "@/shared/common/types/responseTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("exitChatRoom", () => {
  const mockChatRoomId = "chat-room-123";

  const mockResponse: AxiosResponse<ApiResponse> = {
    data: {
      message: "채팅방 나가기에 성공했어요."
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

  it("chatRoomId를 포함하여 PATCH 요청을 보내고 응답을 받습니다.", async () => {
    (customAxios.patch as jest.Mock).mockResolvedValue(mockResponse);

    const result = await exitChatRoom(mockChatRoomId);

    expect(customAxios.patch).toHaveBeenCalledWith(
      `/api/chat/${mockChatRoomId}/exit`
    );
    expect(result).toEqual(mockResponse);
  });

  it("요청 중 에러가 발생하면 예외를 던집니다.", async () => {
    const error = new Error(
      "채팅방 나가기에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
    (customAxios.patch as jest.Mock).mockRejectedValue(error);

    await expect(exitChatRoom(mockChatRoomId)).rejects.toThrow(
      "채팅방 나가기에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
  });
});
