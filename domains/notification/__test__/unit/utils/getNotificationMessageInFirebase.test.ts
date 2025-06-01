import getNotificationMessageInFirebase from "@/domains/notification/utils/getNotificationMessageInFirebase";
import { getRealtimeDB } from "@/shared/common/utils/firebaseSetting";

jest.mock("@/shared/common/utils/firebaseSetting", () => ({
  getRealtimeDB: jest.fn()
}));

jest.mock("firebase/database", () => ({
  ref: jest.fn(),
  query: jest.fn(),
  get: jest.fn(),
  orderByKey: jest.fn(),
  endBefore: jest.fn(),
  limitToLast: jest.fn()
}));

import {
  ref,
  query,
  get,
  endBefore,
  limitToLast
} from "firebase/database";

describe("getNotificationMessageInFirebase 함수 테스트", () => {
  const mockUserId = "user123";
  const mockDatabase = {};
  const mockMessagesData = {
    m1: { content: "알림1", isRead: false },
    m2: { content: "알림2", isRead: false },
    m3: { content: "알림3", isRead: true }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (getRealtimeDB as jest.Mock).mockResolvedValue(mockDatabase);
    (ref as jest.Mock).mockImplementation((_, path) => ({ path }));
    (query as jest.Mock).mockReturnValue("queryRef");
    (get as jest.Mock).mockResolvedValue({
      val: () => mockMessagesData
    });
  });

  it("메시지가 없으면 빈 배열과 nextKey null을 반환합니다.", async () => {
    (get as jest.Mock).mockResolvedValueOnce({
      val: () => null
    });

    const result = await getNotificationMessageInFirebase({
      userId: mockUserId
    });

    expect(result).toEqual({
      messages: [],
      nextKey: null
    });
  });

  it("메시지가 있으면 역순으로 정렬하여 반환합니다.", async () => {
    const result = await getNotificationMessageInFirebase({
      userId: mockUserId,
      limit: 3
    });

    expect(result.messages).toEqual([
      { id: "m3", content: "알림3", isRead: true },
      { id: "m2", content: "알림2", isRead: false },
      { id: "m1", content: "알림1", isRead: false }
    ]);

    expect(result.nextKey).toBe("m1");
  });

  it("메시지 수가 limit보다 작으면 nextKey는 null입니다.", async () => {
    const smallData = {
      m1: { content: "알림1", isRead: false }
    };

    (get as jest.Mock).mockResolvedValueOnce({
      val: () => smallData
    });

    const result = await getNotificationMessageInFirebase({
      userId: mockUserId,
      limit: 5
    });

    expect(result.messages).toEqual([
      { id: "m1", content: "알림1", isRead: false }
    ]);
    expect(result.nextKey).toBeNull();
  });

  it("lastKey가 있으면 endBefore가 호출됩니다.", async () => {
    const mockLastKey = "m3";

    await getNotificationMessageInFirebase({
      userId: mockUserId,
      lastKey: mockLastKey,
      limit: 2
    });

    expect(endBefore).toHaveBeenCalledWith("m3");
    expect(limitToLast).toHaveBeenCalledWith(2);
  });
});
