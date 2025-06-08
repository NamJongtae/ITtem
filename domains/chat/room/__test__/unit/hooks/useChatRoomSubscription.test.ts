import { renderHook, act, waitFor } from "@testing-library/react";
import useChatRoomSubscription from "../../../hooks/useChatRoomSubscription";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import useJoinChatRoomMutate from "../../../hooks/mutations/useJoinChatRoomMutate";
import useLeaveChatRoomMutate from "../../../hooks/mutations/useLeaveChatRoomMutate";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query
} from "firebase/firestore";

jest.mock("next/navigation");
jest.mock("react-toastify", () => ({
  toast: { warn: jest.fn() }
}));
jest.mock("@/domains/auth/shared/common/store/authStore", () => jest.fn());
jest.mock("../../../hooks/mutations/useJoinChatRoomMutate", () => jest.fn());
jest.mock("../../../hooks/mutations/useLeaveChatRoomMutate", () => jest.fn());
jest.mock("@/shared/common/utils/firebaseSetting", () => ({
  getFirestoreDB: jest.fn().mockResolvedValue("mock-db")
}));

jest.mock("firebase/firestore", () => ({
  __esModule: true,
  doc: jest.fn(),
  collection: jest.fn(),
  query: jest.fn(),
  orderBy: jest.fn(),
  onSnapshot: jest.fn()
}));

// firestoreOnSnapshot mocking 헬퍼 함수
function mockFirestoreSubscription({
  withChatData = true,
  userEntered = true,
  withMessages = true
} = {}) {
  (onSnapshot as jest.Mock).mockImplementation((ref, cb) => {
    // 채팅방 정보 구독
    if (ref === "chatRooms/room123") {
      cb({
        data: () =>
          withChatData
            ? {
                entered: userEntered ? { user123: true } : {},
                name: "테스트 채팅방"
              }
            : null
      });
    }

    // 메시지 구독
    if (ref === "mockQuery") {
      cb({
        docChanges: () =>
          withMessages
            ? [
                {
                  type: "added",
                  doc: {
                    data: () => ({
                      id: "msg1",
                      content: "hello",
                      timestamp: { seconds: 123 }
                    })
                  }
                }
              ]
            : []
      });
    }

    return jest.fn(); // unsubscribe mock
  });
}

describe("useChatRoomSubscription 훅 테스트", () => {
  const mockPush = jest.fn();
  const mockJoin = jest.fn();
  const mockLeave = jest.fn();

  const mockSetChatData = jest.fn();
  const mockSetMessages = jest.fn();
  const mockSetIsLoading = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (doc as jest.Mock).mockImplementation((_db, path) => path);
    (collection as jest.Mock).mockReturnValue("mockCollection");
    (query as jest.Mock).mockReturnValue("mockQuery");
    (orderBy as jest.Mock).mockImplementation((field) => field);
    mockFirestoreSubscription();

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush
    });
    (useParams as jest.Mock).mockReturnValue({ chatRoomId: "room123" });

    (useAuthStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        user: {
          uid: "user123"
        }
      })
    );

    (useJoinChatRoomMutate as jest.Mock).mockReturnValue({
      joinChatRoomMutate: mockJoin
    });
    (useLeaveChatRoomMutate as jest.Mock).mockReturnValue({
      leaveChatRoomMutate: mockLeave
    });
  });

  it("chatRoomId 또는 myUid 또는 isExit가 없으면 join 호출되지 않습니다.", () => {
    (useParams as jest.Mock).mockReturnValue({ chatRoomId: null });
    renderHook(() =>
      useChatRoomSubscription({
        isExit: false,
        setChatData: mockSetChatData,
        setMessages: mockSetMessages,
        setIsLoading: mockSetIsLoading
      })
    );
    expect(mockJoin).not.toHaveBeenCalled();
  });

  it("채팅방 데이터가 없으면 /chat으로 이동합니다.", async () => {
    mockFirestoreSubscription({ withChatData: false });

    await act(async () => {
      renderHook(() =>
        useChatRoomSubscription({
          isExit: false,
          setChatData: mockSetChatData,
          setMessages: mockSetMessages,
          setIsLoading: mockSetIsLoading
        })
      );
    });

    expect(mockPush).toHaveBeenCalledWith("/chat");
    expect(mockSetChatData).not.toHaveBeenCalled();
    expect(mockSetIsLoading).not.toHaveBeenCalled();
  });

  it("entered에 myUid가 없으면 /chat으로 이동합니다.", async () => {
    mockFirestoreSubscription({ userEntered: false });

    await act(async () => {
      renderHook(() =>
        useChatRoomSubscription({
          isExit: false,
          setChatData: mockSetChatData,
          setMessages: mockSetMessages,
          setIsLoading: mockSetIsLoading
        })
      );
    });

    expect(mockPush).toHaveBeenCalledWith("/chat");
    expect(mockSetChatData).not.toHaveBeenCalled();
    expect(mockSetIsLoading).not.toHaveBeenCalled();
  });

  it("채팅방 입장 실패 시 toast.warn 에러 메세지 출력 및 /chat으로 이동합니다.", async () => {
    const error = {
      response: {
        data: { message: "입장 실패" }
      },
      isAxiosError: true
    };

    const mockJoin = jest.fn().mockRejectedValue(error);

    (useJoinChatRoomMutate as jest.Mock).mockReturnValue({
      joinChatRoomMutate: mockJoin
    });

    renderHook(() =>
      useChatRoomSubscription({
        isExit: false,
        setChatData: jest.fn(),
        setMessages: jest.fn(),
        setIsLoading: jest.fn()
      })
    );

    await waitFor(() => {
      expect(mockJoin).toHaveBeenCalledWith("room123");
      expect(toast.warn).toHaveBeenCalledWith("입장 실패");
      expect(mockPush).toHaveBeenCalledWith("/chat");
    });
  });

  it("입장 성공 시 firestore 구독이 설정됩니다.", async () => {
    mockJoin.mockResolvedValueOnce(null);

    await act(async () => {
      renderHook(() =>
        useChatRoomSubscription({
          isExit: false,
          setChatData: mockSetChatData,
          setMessages: mockSetMessages,
          setIsLoading: mockSetIsLoading
        })
      );
    });

    expect(mockJoin).toHaveBeenCalledWith("room123");
    expect(mockSetMessages).toHaveBeenCalledWith(expect.any(Function));
    expect(mockSetChatData).toHaveBeenCalled();
    expect(mockSetIsLoading).toHaveBeenCalledWith(false);
  });

  it("unmount 시 leaveChatRoomMutate와 unsubscribe 호출됩니다.", async () => {
    mockJoin.mockResolvedValueOnce(null);
    const { unmount } = renderHook(() =>
      useChatRoomSubscription({
        isExit: false,
        setChatData: mockSetChatData,
        setMessages: mockSetMessages,
        setIsLoading: mockSetIsLoading
      })
    );

    unmount();

    expect(mockLeave).toHaveBeenCalledWith("room123");
  });
});
