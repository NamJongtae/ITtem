import readAllNotificationMessageInFirebase from "@/domains/notification/utils/readAllNotificationMessageInFirebase";
import { getRealtimeDB } from "@/shared/common/utils/firebaseSetting";

jest.mock("@/shared/common/utils/firebaseSetting", () => ({
  getRealtimeDB: jest.fn()
}));

jest.mock("firebase/database", () => ({
  ref: jest.fn(),
  update: jest.fn(),
  get: jest.fn(),
  query: jest.fn(),
  orderByKey: jest.fn(),
  startAt: jest.fn(),
  increment: jest.fn((val) => `increment(${val})`)
}));

import { ref, get, update } from "firebase/database";

describe("readAllNotificationMessageInFirebase 함수 테스트", () => {
  const mockUserId = "user123";
  const mockEndKey = "endKey";
  const mockDatabase = {};

  const mockMessageData = [{ key: "msg1" }, { key: "msg2" }, { key: "msg3" }];

  beforeEach(() => {
    jest.clearAllMocks();
    (getRealtimeDB as jest.Mock).mockResolvedValue(mockDatabase);

    (ref as jest.Mock).mockImplementation((_, path) => ({ path }));
    (get as jest.Mock).mockResolvedValue({
      exists: () => true,
      forEach: (callback: (mes: { key: string }) => void) => {
        mockMessageData.forEach((msg) => callback(msg));
      }
    });

    (update as jest.Mock).mockResolvedValue(undefined);
  });

  it("모든 메시지를 읽음 처리하고 unreadCount를 감소시킵니다.", async () => {
    await readAllNotificationMessageInFirebase({
      userId: mockUserId,
      endKey: mockEndKey
    });

    // 모든 메세지 읽음 처리 확인
    expect(update).toHaveBeenCalledWith(
      { path: undefined },
      {
        "notification/user123/messages/msg1/isRead": true,
        "notification/user123/messages/msg2/isRead": true,
        "notification/user123/messages/msg3/isRead": true
      }
    );

    // unreadCount 처리 확인
    expect(update).toHaveBeenCalledWith(
      { path: "notification/user123/counter" },
      { unreadCount: "increment(-3)" }
    );
  });

  it("메세지가 존재하지 않으면 에러를 throw합니다.", async () => {
    (get as jest.Mock).mockResolvedValueOnce({
      exists: () => false,
      forEach: () => {}
    });

    await expect(
      readAllNotificationMessageInFirebase({
        userId: mockUserId,
        endKey: mockEndKey
      })
    ).rejects.toThrow("잘못된 접근이에요.");

    expect(update).not.toHaveBeenCalled();
  });
});
