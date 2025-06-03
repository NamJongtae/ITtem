import deleteNotificationMessage from "@/domains/notification/api/deleteNotificationMessage";
import customAxios from "@/shared/common/utils/customAxios";

jest.mock("@/shared/common/utils/customAxios");

describe("deleteNotificationMessage API 함수 테스트", () => {
  const mockMessageId = "notification-msg-123";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("messageId를 포함한 DELETE 요청을 보냅니다.", async () => {
    (customAxios.delete as jest.Mock).mockResolvedValue({ status: 200 });

    await deleteNotificationMessage(mockMessageId);

    expect(customAxios.delete).toHaveBeenCalledWith(
      `/api/notification/${mockMessageId}`
    );
  });

  it("요청 중 에러가 발생하면 예외를 던집니다.", async () => {
    const error = new Error(
      "알림 메세지 삭제에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
    (customAxios.delete as jest.Mock).mockRejectedValue(error);

    await expect(deleteNotificationMessage(mockMessageId)).rejects.toThrow(
      "알림 메세지 삭제에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
  });
});
