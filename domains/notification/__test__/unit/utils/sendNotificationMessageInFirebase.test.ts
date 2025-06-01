import sendNotificationMessageInFirebase from "@/domains/notification/utils/sendNotificationMessageInFirebase";
import { getRealtimeDB } from "@/shared/common/utils/firebaseSetting";

jest.mock("@/shared/common/utils/firebaseSetting", () => ({
  getRealtimeDB: jest.fn()
}));

jest.mock("firebase/database", () => ({
  ref: jest.fn(),
  push: jest.fn(),
  set: jest.fn()
}));

import { ref as databaseRef, push, set } from "firebase/database";

describe("sendNotificationMessageInFirebase 함수 테스트", () => {
  const mockUserId = "user123";
  const mockDatabase = {};
  const mockMessage = "알림 테스트 메시지";

  const mockNewMessageRef = { key: "mockMsgKey" };

  beforeEach(() => {
    jest.clearAllMocks();
    (getRealtimeDB as jest.Mock).mockResolvedValue(mockDatabase);
    (databaseRef as jest.Mock).mockImplementation((_, path) => ({ path }));
    (push as jest.Mock).mockReturnValue(mockNewMessageRef);
    (set as jest.Mock).mockResolvedValue(undefined);
  });

  it("userId가 없으면 아무 동작도 하지 않습니다.", async () => {
    await sendNotificationMessageInFirebase("", mockMessage);

    expect(push).not.toHaveBeenCalled();
    expect(set).not.toHaveBeenCalled();
  });

  it("정상적으로 메시지를 push(새로운 키를 생성)하고 set(저장)합니다.", async () => {
    const now = Date.now();
    jest.spyOn(global.Date, "now").mockReturnValue(now);

    await sendNotificationMessageInFirebase(mockUserId, mockMessage);

    expect(push).toHaveBeenCalledWith({
      path: `notification/${mockUserId}/messages`
    });

    expect(set).toHaveBeenCalledWith(mockNewMessageRef, {
      content: mockMessage,
      isRead: false,
      isNotification: false,
      timestamp: now
    });

    jest.spyOn(global.Date, "now").mockRestore();
  });
});
