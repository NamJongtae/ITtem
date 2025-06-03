import deleteAllNotificationMessage from "@/domains/notification/api/deleteAllNotificationMessage";
import customAxios from "@/shared/common/utils/customAxios";

// Axios 모킹
jest.mock("@/shared/common/utils/customAxios");

describe("deleteAllNotificationMessage API 함수 테스트", () => {
  const mockEndKey = "notification-key-123";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("endKey를 포함한 DELETE 요청을 보냅니다.", async () => {
    (customAxios.delete as jest.Mock).mockResolvedValue({ status: 200 });

    await deleteAllNotificationMessage(mockEndKey);

    expect(customAxios.delete).toHaveBeenCalledWith("/api/notification", {
      data: { endKey: mockEndKey }
    });
  });

  it("요청 중 에러가 발생하면 예외를 던집니다.", async () => {
    const error = new Error(
      "알림 메세지 삭제에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
    (customAxios.delete as jest.Mock).mockRejectedValue(error);

    await expect(deleteAllNotificationMessage(mockEndKey)).rejects.toThrow(
      "알림 메세지 삭제에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
  });
});
