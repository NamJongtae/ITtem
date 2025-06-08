import { renderHook, waitFor } from "@testing-library/react";
import useChatRoomListLogic from "../../../hooks/useChatRoomListLogic";
import useChatStore from "@/domains/chat/shared/store/chatStore";
import { ChatRoomData } from "../../../types/chatRoomTypes";
import { getFirestoreDB } from "@/shared/common/utils/firebaseSetting";
import { doc, onSnapshot } from "firebase/firestore";

jest.mock("@/domains/chat/shared/store/chatStore");
jest.mock("@/shared/common/utils/firebaseSetting", () => ({
  getFirestoreDB: jest.fn()
}));
jest.mock("firebase/firestore", () => ({
  doc: jest.fn(),
  onSnapshot: jest.fn()
}));

describe("useChatRoomListLogic 훅 테스트", () => {
  const mockSetState = (chatRoomIds: string[], chatRoomIdsLoading: boolean) => {
    (useChatStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        chatRoomIds,
        chatRoomIdsLoading
      })
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("chatRoomIdsLoading이 true이면 구독을 시작하지 않습니다.", () => {
    mockSetState(["room1"], true);

    const { result } = renderHook(() => useChatRoomListLogic());
    expect(result.current.isLoading).toBe(true);
    expect(result.current.chatRoomData).toEqual({});
    expect(onSnapshot).not.toHaveBeenCalled();
  });

  it("chatRoomIds가 빈 배열이면 chatRoomData는 비어있고 isLoading은 false여야 합니다.", () => {
    mockSetState([], false);

    const { result } = renderHook(() => useChatRoomListLogic());
    expect(result.current.isLoading).toBe(false);
    expect(result.current.chatRoomData).toEqual({});
  });

  it("여러 chatRoomId가 있으면 각각에 대해 onSnapshot이 호출됩니다.", async () => {
    const mockUnsubscribe1 = jest.fn();
    const mockUnsubscribe2 = jest.fn();

    mockSetState(["room1", "room2"], false);

    (getFirestoreDB as jest.Mock).mockResolvedValue("fake-db");
    (doc as jest.Mock).mockImplementation((_db, path) => path);

    const snapshots: Record<string, { id: string; data: () => ChatRoomData }> =
      {
        "chatRooms/room1": {
          id: "room1",
          data: () =>
            ({
              lastMessage: {
                senderId: "user1",
                timestamp: {
                  toDate: () => new Date(),
                  seconds: 1,
                  nanoseconds: 0
                },
                content: "메시지1"
              }
            }) as ChatRoomData
        },
        "chatRooms/room2": {
          id: "room2",
          data: () =>
            ({
              lastMessage: {
                senderId: "user2",
                timestamp: {
                  toDate: () => new Date(),
                  seconds: 2,
                  nanoseconds: 0
                },
                content: "메시지2"
              }
            }) as ChatRoomData
        }
      };

    (onSnapshot as jest.Mock).mockImplementation((path, callback) => {
      callback(snapshots[path]);
      return path.includes("room1") ? mockUnsubscribe1 : mockUnsubscribe2;
    });

    const { result } = renderHook(() => useChatRoomListLogic());

    await waitFor(() =>
      expect(Object.keys(result.current.chatRoomData)).toEqual([
        "room1",
        "room2"
      ])
    );

    expect(onSnapshot).toHaveBeenCalledTimes(2);
  });

  it("unmount 시 모든 unsubscribe 함수가 호출되어야 합니다.", async () => {
    const mockUnsubscribe1 = jest.fn();
    const mockUnsubscribe2 = jest.fn();

    mockSetState(["room1", "room2"], false);

    (getFirestoreDB as jest.Mock).mockResolvedValue("fake-db");
    (doc as jest.Mock).mockImplementation((_db, path) => path);

    const snapshots: Record<string, { id: string; data: () => ChatRoomData }> =
      {
        "chatRooms/room1": {
          id: "room1",
          data: () =>
            ({
              lastMessage: {
                senderId: "user123",
                timestamp: {
                  toDate: () => new Date(),
                  seconds: 123456,
                  nanoseconds: 0
                },
                content: "메시지1"
              }
            }) as ChatRoomData
        },
        "chatRooms/room2": {
          id: "room2",
          data: () =>
            ({
              lastMessage: {
                senderId: "user123",
                timestamp: {
                  toDate: () => new Date(),
                  seconds: 123456,
                  nanoseconds: 0
                },
                content: "메시지2"
              }
            }) as ChatRoomData
        }
      };

    (onSnapshot as jest.Mock).mockImplementation((path, callback) => {
      callback(snapshots[path]);
      if (path === "chatRooms/room1") return mockUnsubscribe1;
      if (path === "chatRooms/room2") return mockUnsubscribe2;
    });

    const { unmount } = renderHook(() => useChatRoomListLogic());

    await waitFor(() => {
      expect(onSnapshot).toHaveBeenCalledTimes(2);
    });

    unmount();

    expect(mockUnsubscribe1).toHaveBeenCalled();
    expect(mockUnsubscribe2).toHaveBeenCalled();
  });

  it("getFirestoreDB 호출 중 오류가 발생하면 isLoading은 false가 되어야 합니다.", async () => {
    mockSetState(["room1"], false);

    (getFirestoreDB as jest.Mock).mockRejectedValue(new Error("DB 실패"));

    const { result } = renderHook(() => useChatRoomListLogic());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });
});
