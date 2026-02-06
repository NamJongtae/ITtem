import { renderHook, act, waitFor } from "@testing-library/react";
import useNotification from "@/shared/layout/hooks/useNotification";
import useNotificationStore from "@/domains/notification/store/notificationStore";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  onChildAdded,
  onValue,
  update,
  increment,
  get
} from "firebase/database";

jest.mock("@/domains/notification/store/notificationStore", () => ({
  __esModule: true,
  default: jest.fn()
}));
jest.mock("@/domains/auth/shared/common/store/authStore", () => ({
  __esModule: true,
  default: jest.fn()
}));
jest.mock("next/navigation", () => ({ useRouter: jest.fn() }));
jest.mock("@/shared/common/utils/firebaseSetting", () => ({
  getRealtimeDB: jest.fn().mockResolvedValue("mockDatabase")
}));
jest.mock("firebase/database", () => ({
  ref: jest.fn(),
  query: jest.fn(),
  orderByChild: jest.fn(),
  equalTo: jest.fn(),
  onChildAdded: jest.fn(),
  onValue: jest.fn(),
  get: jest.fn(),
  update: jest.fn(),
  increment: jest.fn()
}));
jest.mock("react-toastify", () => ({
  toast: { info: jest.fn() }
}));

describe("useNotification 훅 테스트", () => {
  const mockPush = jest.fn();
  const mockNotificationActions = {
    setUnreadCount: jest.fn(),
    resetUnreadCount: jest.fn()
  };

  const mockUseAuthStore = useAuthStore as jest.MockedFunction<
    typeof useAuthStore
  >;
  const mockUseNotificationStore = useNotificationStore as jest.MockedFunction<
    typeof useNotificationStore
  >;

  const createWrapper = () => {
    const queryClient = new QueryClient();
    const Wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    Wrapper.displayName = "QueryClientWrapper";
    return Wrapper;
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseAuthStore.mockImplementation((selector) =>
      selector({
        user: {
          uid: "test-uid",
          email: "test@test.com",
          nickname: "Tester",
          profileImg: "https://example.com/profile.png"
        },
        isLoading: false,
        actions: {
          setAuth: jest.fn(),
          resetAuth: jest.fn(),
          setIsLoading: jest.fn()
        }
      })
    );

    mockUseNotificationStore.mockImplementation((selector) =>
      selector({
        unreadCount: 3,
        actions: mockNotificationActions
      })
    );

    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    (onChildAdded as jest.Mock).mockImplementation((query, cb) => {
      (mockUseNotificationStore as any).onChildAddedCallback = cb;
      return jest.fn();
    });
    (onValue as jest.Mock).mockImplementation((ref, cb) => {
      (mockUseNotificationStore as any).onValueCallback = cb;
      return jest.fn();
    });
    (update as jest.Mock).mockResolvedValue(true);
    (increment as jest.Mock).mockImplementation((x: number) => x + 1);
  });

  it("모달 열기/닫기 및 toggleNotification 동작", async () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useNotification(), {
      wrapper: createWrapper()
    });

    const div = document.createElement("div");
    act(() => (result.current.notificationRef.current = div));

    // 열기
    act(() => result.current.toggleNotification());
    expect(result.current.isOpenModal).toBe(true);

    // 닫기
    act(() => result.current.toggleNotification());
    act(() => jest.runAllTimers());

    await waitFor(() => expect(result.current.isOpenModal).toBe(false));
    jest.useRealTimers();
  });

  it("로그인하지 않은 경우 /signin으로 이동", () => {
    mockUseAuthStore.mockImplementation((selector) =>
      selector({
        user: null,
        isLoading: false,
        actions: {
          setAuth: jest.fn(),
          resetAuth: jest.fn(),
          setIsLoading: jest.fn()
        }
      })
    );

    const { result } = renderHook(() => useNotification(), {
      wrapper: createWrapper()
    });
    act(() => result.current.toggleNotification());
    expect(mockPush).toHaveBeenCalledWith("/signin");
  });

  it("notificationRef 외부 클릭 시 모달 닫힘", async () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useNotification(), {
      wrapper: createWrapper()
    });

    const div = document.createElement("div");
    document.body.appendChild(div);

    act(() => {
      result.current.notificationRef.current = div;
      result.current.toggleNotification();
    });
    expect(result.current.isOpenModal).toBe(true);

    act(() => {
      document.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
      jest.runAllTimers();
    });

    await waitFor(() => expect(result.current.isOpenModal).toBe(false));
    jest.useRealTimers();
  });

  it("Firebase onChildAdded 이벤트 발생 시 toast.info 호출 및 unreadCount 증가", async () => {
    // counterRef에 대한 get(mock) 응답
    (get as jest.Mock).mockResolvedValue({
      exists: () => true,
      val: () => ({ unreadCount: 3 })
    });

    renderHook(() => useNotification(), {
      wrapper: createWrapper()
    });

    // Firebase 새 메시지 스냅샷 시뮬레이션
    const newMessage = { content: "새 알림입니다.", isNotification: false };
    await act(async () => {
      // onChildAdded 콜백 직접 호출 (알림 수신)
      (mockUseNotificationStore as any).onChildAddedCallback({
        key: "msg1",
        val: () => newMessage
      });

      // counterRef 에 대한 onValue 콜백 직접 호출 (unreadCount 변경 반영)
      (mockUseNotificationStore as any).onValueCallback({
        val: () => ({ unreadCount: 4 })
      });
    });

    // toast 호출 확인
    expect(toast.info).toHaveBeenCalledWith("새 알림입니다.");

    // unreadCount 증가(갱신) 확인
    expect(mockNotificationActions.setUnreadCount).toHaveBeenCalledWith(4);

    // DB update 호출 확인 (isNotification / unreadCount 갱신)
    expect(update).toHaveBeenCalled();
  });
});
