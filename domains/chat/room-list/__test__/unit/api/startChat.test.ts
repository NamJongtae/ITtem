import startChat from "../../../api/startChat";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import { StartChatResponseData } from "../../../types/responseTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("startChat API 함수 테스트", () => {
  const mockProductId = "product123";
  const mockUserId = "userId123";

  const mockResponse: AxiosResponse<StartChatResponseData> = {
    data: {
      chatRoomId: "chatRoom123",
      message: "채팅방 생성/조회에 성공했어요."
    },
    status: 201,
    statusText: "ok",
    headers: {},
    config: {
      headers: new AxiosHeaders()
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("productId와 userId를 포함한 POST 요청을 보내고 응답을 받습니다.", async () => {
    (customAxios.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await startChat({
      productId: mockProductId,
      userId: mockUserId
    });

    expect(customAxios.post).toHaveBeenCalledWith("/api/chat", {
      productId: mockProductId,
      userId: mockUserId
    });

    expect(result).toEqual(mockResponse);
  });

  it("요청 중 에러가 발생하면 예외를 던집니다.", async () => {
    const error = new Error(
      "채팅방 생성/조회에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
    (customAxios.post as jest.Mock).mockRejectedValue(error);

    await expect(
      startChat({ productId: mockProductId, userId: mockUserId })
    ).rejects.toThrow(
      "채팅방 생성/조회에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
  });
});
