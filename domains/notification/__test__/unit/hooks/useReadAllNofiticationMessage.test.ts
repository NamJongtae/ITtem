import { renderHook, act } from "@testing-library/react";
import useReadAllNofiticationMessage from "@/domains/notification/hooks/useReadAllNofiticationMessage";
import useReadAllNotificationMessagesMutate from "@/domains/notification/hooks/mutations/useReadAllNotificationMessageMutate";
import { toast } from "react-toastify";
import { NotificationMessageData } from "@/domains/notification/types/notificationTypes";

jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  }
}));

jest.mock(
  "@/domains/notification/hooks/mutations/useReadAllNotificationMessageMutate"
);

// window.confirm 모킹 함수
const mockConfirm = (value: boolean) => {
  window.confirm = jest.fn(() => value);
};

describe("useReadAllNofiticationMessage 훅 테스트", () => {
  const mockUseReadAllMutate =
    useReadAllNotificationMessagesMutate as jest.Mock;
  const mockMutate = jest.fn();

  const unreadMessageData = [
    { id: "1", content: "읽지 않은 메시지", isRead: false }
  ] as NotificationMessageData[];

  const readMessageData = [
    { id: "2", content: "이미 읽은 메시지", isRead: true }
  ] as NotificationMessageData[];

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseReadAllMutate.mockReturnValue({ mutate: mockMutate });
  });

  it("읽지 않은 메시지가 없으면 toast.warn이 호출되어 메세지가 출력됩니다.", () => {
    const { result } = renderHook(() =>
      useReadAllNofiticationMessage({
        messageData: readMessageData,
        lastMessageKey: "last-1"
      })
    );

    act(() => {
      result.current.onClickReadAll();
    });

    expect(toast.warn).toHaveBeenCalledWith(
      "읽음 처리할 알림 메세지가 없어요."
    );
    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("messageData가 undefined면 toast.warn이 호출되어 메세지가 출력됩니다.", () => {
    const { result } = renderHook(() =>
      useReadAllNofiticationMessage({
        messageData: undefined,
        lastMessageKey: "last-2"
      })
    );

    act(() => {
      result.current.onClickReadAll();
    });

    expect(toast.warn).toHaveBeenCalledWith(
      "읽음 처리할 알림 메세지가 없어요."
    );
    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("confirm이 true이면 mutate가 호출됩니다.", () => {
    mockConfirm(true);

    const { result } = renderHook(() =>
      useReadAllNofiticationMessage({
        messageData: unreadMessageData,
        lastMessageKey: "last-3"
      })
    );

    act(() => {
      result.current.onClickReadAll();
    });

    expect(mockMutate).toHaveBeenCalledWith("last-3");
  });

  it("confirm이 false이면 mutate가 호출되지 않습니다.", () => {
    mockConfirm(false);

    const { result } = renderHook(() =>
      useReadAllNofiticationMessage({
        messageData: unreadMessageData,
        lastMessageKey: "last-4"
      })
    );

    act(() => {
      result.current.onClickReadAll();
    });

    expect(mockMutate).not.toHaveBeenCalled();
  });
});
