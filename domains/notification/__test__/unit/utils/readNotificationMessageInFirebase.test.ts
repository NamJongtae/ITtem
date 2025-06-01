import readyNotificationMessageInFirebase from "@/domains/notification/utils/readNotificationMessageInFirebase";
import { getRealtimeDB } from "@/shared/common/utils/firebaseSetting";

jest.mock("@/shared/common/utils/firebaseSetting", () => ({
  getRealtimeDB: jest.fn()
}));

jest.mock("firebase/database", () => ({
  ref: jest.fn(),
  get: jest.fn(),
  update: jest.fn(),
  increment: jest.fn((val) => `increment(${val})`)
}));

import { ref, get, update } from "firebase/database";

describe("readyNotificationMessageInFirebase", () => {
  const mockUserId = "user123";
  const mockMessageId = "message123";
  const mockDatabase = {};

  beforeEach(() => {
    jest.clearAllMocks();
    (getRealtimeDB as jest.Mock).mockResolvedValue(mockDatabase);

    (ref as jest.Mock).mockImplementation((_, path) => ({ path }));
    (update as jest.Mock).mockResolvedValue(undefined);
  });

  it("메시지가 존재하지 않으면 에러를 throw합니다.", async () => {
    (get as jest.Mock).mockResolvedValueOnce({
      exists: () => false
    });

    await expect(
      readyNotificationMessageInFirebase({
        userId: mockUserId,
        messageId: mockMessageId
      })
    ).rejects.toThrow("잘못된 접근이에요.");

    expect(update).not.toHaveBeenCalled();
  });

  it("메시지를 읽음 처리하고 unreadCount를 감소시킵니다.", async () => {
    (get as jest.Mock).mockResolvedValueOnce({
      exists: () => true
    });

    await readyNotificationMessageInFirebase({
      userId: mockUserId,
      messageId: mockMessageId
    });

    // 메세지 읽음 처리 확인
    expect(update).toHaveBeenCalledWith(
      { path: `notification/${mockUserId}/messages/${mockMessageId}` },
      { isRead: true }
    );

    // unreadCount 처리 확인
    expect(update).toHaveBeenCalledWith(
      { path: `notification/${mockUserId}/counter` },
      { unreadCount: "increment(-1)" }
    );
  });
});
