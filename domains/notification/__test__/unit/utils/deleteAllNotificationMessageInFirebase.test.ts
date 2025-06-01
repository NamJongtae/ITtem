import deleteAllNotificationMessageInFirebase from "@/domains/notification/utils/deleteAllNotificationMessageInFirebase";
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

import {
  ref,
  update,
  get,
  query,
  orderByKey,
  startAt
} from "firebase/database";

describe("deleteAllNotificationMessageInFirebase 함수 테스트", () => {
  const mockUserId = "user123";
  const mockEndKey = "endKey";
  const mockDatabase = {};

  const mockMessageData = [
    { key: "m1", val: () => ({ isRead: false }) },
    { key: "m2", val: () => ({ isRead: true }) },
    { key: "m3", val: () => ({ isRead: false }) }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (getRealtimeDB as jest.Mock).mockResolvedValue(mockDatabase);

    (ref as jest.Mock).mockImplementation((_, path) => ({ path }));
    (query as jest.Mock).mockReturnValue("queriedRef");
    (orderByKey as jest.Mock).mockReturnValue("ordered");
    (startAt as jest.Mock).mockReturnValue("startAt");

    (get as jest.Mock).mockResolvedValue({
      exists: () => true,
      forEach: (
        callback: (mes: { key: string; val: () => { isRead: boolean } }) => void
      ) => {
        mockMessageData.forEach((msg) => {
          callback(msg);
        });
      }
    });

    (update as jest.Mock).mockResolvedValue(undefined);
  });

  it("정상적으로 메시지를 삭제하고 unreadCount를 업데이트합니다.", async () => {
    await deleteAllNotificationMessageInFirebase({
      userId: mockUserId,
      endKey: mockEndKey
    });

    // 전체 메세지 삭제가 이루어졌는지 확인
    expect(update).toHaveBeenCalledWith(
      // databaseRef
      expect.objectContaining({ path: undefined }),
      // updates
      expect.objectContaining({
        "notification/user123/messages/m1": null,
        "notification/user123/messages/m2": null,
        "notification/user123/messages/m3": null
      })
    );

    // 읽지 않은 2개의 메시지에 대해 unreadCount가 실행됬는지 확인
    expect(update).toHaveBeenCalledWith(
      // counterRef
      expect.objectContaining({ path: "notification/user123/counter" }),
      // update
      { unreadCount: "increment(-2)" }
    );
  });

  it("메시지가 존재하지 않으면 에러를 throw합니다.", async () => {
    (get as jest.Mock).mockResolvedValueOnce({ exists: () => false });

    await expect(
      deleteAllNotificationMessageInFirebase({
        userId: mockUserId,
        endKey: mockEndKey
      })
    ).rejects.toThrow("잘못된 접근이에요.");
  });

  it("삭제 후 메시지가 하나도 없으면 unreadCount를 0으로 설정합니다.", async () => {
    (get as jest.Mock)
      .mockResolvedValueOnce({
        exists: () => true,
        forEach: (
          callback: (mes: {
            key: string;
            val: () => { isRead: boolean };
          }) => void
        ) => {
          mockMessageData.forEach((msg) => callback(msg));
        }
      })
      .mockResolvedValueOnce({
        exists: () => false
      });

    await deleteAllNotificationMessageInFirebase({
      userId: mockUserId,
      endKey: mockEndKey
    });

    expect(update).toHaveBeenCalledWith(
      expect.objectContaining({ path: "notification/user123/counter" }),
      { unreadCount: 0 }
    );
  });
});
