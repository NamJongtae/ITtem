import getNotificationMessage from "@/domains/notification/api/getNotificationMessage";
import customAxios from "@/shared/common/utils/customAxios";
import { AxiosHeaders, AxiosResponse } from "axios";
import { NotificationResponseData } from "@/domains/notification/types/responseTypes";

jest.mock("@/shared/common/utils/customAxios");

describe("getNotificationMessage API 함수 테스트", () => {
  const mockLastKey = "mock-next-key-123";
  const mockResponse: AxiosResponse<NotificationResponseData> = {
    data: {
      messages: [
        {
          id: "notification-msg-123",
          content: "dummy text",
          isRead: false,
          isNotification: false,
          timestamp: Date.now()
        }
      ],
      nextKey: mockLastKey,
      message: "알림 메세지 조회에 성공했어요."
    },
    status: 200,
    statusText: "OK",
    headers: {},
    config: {
      headers: new AxiosHeaders()
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("limit만 있을 경우 기본 GET 요청을 보냅니다.", async () => {
    (customAxios as unknown as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getNotificationMessage({ limit: 5 });

    expect(customAxios).toHaveBeenCalledWith(`/api/notification/?limit=5`);
    expect(result).toEqual(mockResponse);
  });

  it("limit와 lastKey가 있을 경우 쿼리에 함께 포함합니다.", async () => {
    (customAxios as unknown as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getNotificationMessage({
      limit: 20,
      lastKey: mockLastKey
    });

    expect(customAxios).toHaveBeenCalledWith(
      `/api/notification/?limit=20&lastKey=${mockLastKey}`
    );
    expect(result).toEqual(mockResponse);
  });

  it("limit이 생략되면 기본값 10을 사용합니다.", async () => {
    (customAxios as unknown as jest.Mock).mockResolvedValue(mockResponse);

    await getNotificationMessage({});

    expect(customAxios).toHaveBeenCalledWith(`/api/notification/?limit=10`);
  });

  it("에러 발생 시 예외를 던집니다.", async () => {
    const error = new Error(
      "알림 메세지 조회에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
    (customAxios as unknown as jest.Mock).mockRejectedValue(error);

    await expect(getNotificationMessage({ limit: 10 })).rejects.toThrow(
      "알림 메세지 조회에 실패했어요.\n잠시 후 다시 시도해주세요."
    );
  });
});
