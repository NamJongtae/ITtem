import { renderHook, waitFor } from "@testing-library/react";
import useUserChatInfoSubscription from "@/shared/layout/hooks/useUserChatInfoSubscription";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import useChatStore from "@/domains/chat/shared/store/chatStore";

jest.mock("@/shared/common/utils/firebaseSetting", () => ({
  getFirestoreDB: jest.fn().mockResolvedValue("mockFirestore")
}));
jest.mock("firebase/firestore", () => ({
  doc: jest.fn(),
  onSnapshot: jest.fn()
}));
jest.mock("@/domains/auth/shared/common/store/authStore", () => ({
  __esModule: true,
  default: jest.fn()
}));
jest.mock("@/domains/chat/shared/store/chatStore", () => ({
  __esModule: true,
  default: jest.fn()
}));

describe("useUserChatInfoSubscription 훅 테스트", () => {
  const mockUser = { uid: "test-user-uid" };
  const mockActions = {
    saveChatRoomIds: jest.fn(),
    setTotalMessageCount: jest.fn(),
    setChatRoomIdsLoading: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuthStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ user: mockUser })
    );
    (useChatStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ actions: mockActions })
    );
  });

  it("사용자가 없으면 onSnapshot을 구독하지 않아야 합니다.", async () => {
    (useAuthStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ user: null })
    );
    (useChatStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ actions: mockActions })
    );

    renderHook(() => useUserChatInfoSubscription());

    expect(mockActions.setChatRoomIdsLoading).not.toHaveBeenCalled();
  });

  it("onSnapshot이 호출되고 콜백 내에서 액션이 잘 동작해야 합니다.", async () => {
    const { onSnapshot } = await import("firebase/firestore");

    const fakeUnsubscribe = jest.fn();
    const snapshot = {
      exists: () => true,
      data: () => ({
        chatRoomIds: ["room1", "room2"],
        totalMessageCount: 10
      })
    };

    (onSnapshot as jest.Mock).mockImplementation((_ref, cb) => {
      cb(snapshot);
      return fakeUnsubscribe;
    });

    const { unmount } = renderHook(() => useUserChatInfoSubscription());

    // actions가 잘 호출되었는지 확인
    await waitFor(() => {
      expect(mockActions.setChatRoomIdsLoading).toHaveBeenCalledWith(true);
      expect(mockActions.saveChatRoomIds).toHaveBeenCalledWith([
        "room1",
        "room2"
      ]);
      expect(mockActions.setTotalMessageCount).toHaveBeenCalledWith(10);
      expect(mockActions.setChatRoomIdsLoading).toHaveBeenCalledWith(false);
    });

    // 언마운트 시 구독 해제
    unmount();
    expect(fakeUnsubscribe).toHaveBeenCalled();
  });
});
