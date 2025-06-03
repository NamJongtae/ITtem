import readAllNotificationMessage from "@/domains/notification/api/readAllNotificationMessage";
import customAxios from "@/shared/common/utils/customAxios";

jest.mock("@/shared/common/utils/customAxios");

describe("readAllNotificationMessage API 함수 테스트", () => {
  const mockEndKey = "notification-end-key-123";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("endKey를 포함한 PATCH 요청을 보냅니다.", async () => {
    (customAxios.patch as jest.Mock).mockResolvedValue({ status: 200 });

    await readAllNotificationMessage(mockEndKey);

    expect(customAxios.patch).toHaveBeenCalledWith("/api/notification", {
      endKey: mockEndKey
    });
  });

  it("요청 중 에러가 발생하면 예외를 던집니다.", async () => {
    const error = new Error(
      "알림 메세지 읽음 처리에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
    (customAxios.patch as jest.Mock).mockRejectedValue(error);

    await expect(readAllNotificationMessage(mockEndKey)).rejects.toThrow(
      "알림 메세지 읽음 처리에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
  });
});
