import deleteNotificationMessageInFirebase from "@/domains/notification/utils/deleteNotificationMessageInFirebase";
import { getRealtimeDB } from "@/shared/common/utils/firebaseSetting";

jest.mock("@/shared/common/utils/firebaseSetting", () => ({
  getRealtimeDB: jest.fn()
}));

jest.mock("firebase/database", () => ({
  ref: jest.fn(),
  get: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  increment: jest.fn((val) => `increment(${val})`)
}));

import { ref, get, update, remove } from "firebase/database";

describe("deleteNotificationMessageInFirebase 함수 테스트", () => {
  const mockUserId = "user123";
  const mockMessageId = "message123";
  const mockDatabase = {};

  beforeEach(() => {
    jest.clearAllMocks();
    (getRealtimeDB as jest.Mock).mockResolvedValue(mockDatabase);
    (ref as jest.Mock).mockImplementation((_, path) => ({ path }));
  });

  it("메시지가 존재하지 않으면 에러를 throw합니다.", async () => {
    (get as jest.Mock).mockResolvedValueOnce({
      exists: () => false
    });

    await expect(
      deleteNotificationMessageInFirebase({
        userId: mockUserId,
        messageId: mockMessageId
      })
    ).rejects.toThrow("잘못된 접근이에요.");

    expect(remove).not.toHaveBeenCalled();
    expect(update).not.toHaveBeenCalled();
  });

  it("읽지 않은 메시지 삭제 시 update와 remove가 호출됩니다.", async () => {
    (get as jest.Mock).mockResolvedValueOnce({
      exists: () => true,
      val: () => ({ isRead: false })
    });

    await deleteNotificationMessageInFirebase({
      userId: mockUserId,
      messageId: mockMessageId
    });

    // unreadCount를 1 감소시킴
    expect(update).toHaveBeenCalledWith(
      { path: `notification/${mockUserId}/counter` },
      { unreadCount: "increment(-1)" }
    );

    expect(remove).toHaveBeenCalledWith({
      path: `notification/${mockUserId}/messages/${mockMessageId}`
    });
  });

  it("읽은 메시지 삭제 시 update는 호출되지 않고 remove만 호출됩니다.", async () => {
    (get as jest.Mock).mockResolvedValueOnce({
      exists: () => true,
      val: () => ({ isRead: true })
    });

    await deleteNotificationMessageInFirebase({
      userId: mockUserId,
      messageId: mockMessageId
    });

    expect(update).not.toHaveBeenCalled();

    expect(remove).toHaveBeenCalledWith({
      path: `notification/${mockUserId}/messages/${mockMessageId}`
    });
  });
});
