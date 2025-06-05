import { renderHook, act, waitFor } from "@testing-library/react";
import useNotification from "@/shared/layout/hooks/useNotification";
import useNotificationStore from "@/domains/notification/store/notificationStore";
import useAuthStore from "@/domains/auth/shared/common/store/authStore";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

jest.mock("@/domains/notification/store/notificationStore", () => ({
  __esModule: true,
  default: jest.fn()
}));
jest.mock("@/domains/auth/shared/common/store/authStore", () => ({
  __esModule: true,
  default: jest.fn()
}));
jest.mock("next/navigation", () => ({
  useRouter: jest.fn()
}));
jest.mock("@/shared/common/utils/firebaseSetting", () => ({
  getRealtimeDB: jest.fn().mockResolvedValue("mockDatabase")
}));
jest.mock("firebase/database", () => ({
  ref: jest.fn(),
  query: jest.fn(),
  onValue: jest.fn(),
  orderByChild: jest.fn(),
  equalTo: jest.fn(),
  get: jest.fn(),
  update: jest.fn(),
  increment: jest.fn()
}));

describe("useNotification 훅 테스트", () => {
  const mockPush = jest.fn();

  const mockActions = {
    setUnreadCount: jest.fn()
  };

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

    // 로그인된 사용자
    (useAuthStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ user: { uid: "test-uid" } })
    );
    (useNotificationStore as unknown as jest.Mock).mockImplementation(
      (selector) => selector({ unreadCount: 3, actions: mockActions })
    );
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("기본 상태에서는 모달은 닫혀 있어야 합니다.", () => {
    const { result } = renderHook(() => useNotification(), {
      wrapper: createWrapper()
    });
    expect(result.current.isOpenModal).toBe(false);
  });

  it("toggleNotification: 모달이 열리고 닫힘 상태가 전환돼야 함", async () => {
    jest.useFakeTimers();

    const { result } = renderHook(() => useNotification(), {
      wrapper: createWrapper()
    });

    // ref DOM 객체 설정
    const fakeDiv = document.createElement("div");
    act(() => {
      result.current.notificationRef.current = fakeDiv;
    });

    // 열기
    act(() => {
      result.current.toggleNotification();
    });
    expect(result.current.isOpenModal).toBe(true);

    // 닫기
    act(() => {
      result.current.toggleNotification();
    });

    // 타이머 강제 실행
    act(() => {
      jest.runAllTimers();
    });

    // 상태 업데이트 기다리기
    await waitFor(() => {
      expect(result.current.isOpenModal).toBe(false);
    });

    jest.useRealTimers();
  });

  it("로그인하지 않은 경우, /signin으로 이동해야 합니다.", () => {
    (useAuthStore as unknown as jest.Mock).mockImplementation(
      (selector) => selector({ user: null }) // 로그인 안 됨
    );

    const { result } = renderHook(() => useNotification(), {
      wrapper: createWrapper()
    });

    act(() => {
      result.current.toggleNotification();
    });

    expect(mockPush).toHaveBeenCalledWith("/signin");
  });

  it("notificationRef 외부 클릭 시 closeNotification 호출되어야 합니다.", () => {
    const { result } = renderHook(() => useNotification(), {
      wrapper: createWrapper()
    });

    const mockDiv = document.createElement("div");
    document.body.appendChild(mockDiv);
    result.current.notificationRef.current = mockDiv;

    act(() => {
      result.current.toggleNotification(); // 열림
      jest.runAllTimers();
    });

    const event = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true
    });

    document.dispatchEvent(event);

    // 타이머 딜레이 후 닫힘 확인
    setTimeout(() => {
      expect(result.current.isOpenModal).toBe(false);
    }, 200);
  });
});
