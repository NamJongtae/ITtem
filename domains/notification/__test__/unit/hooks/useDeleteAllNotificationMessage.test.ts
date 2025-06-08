import { renderHook, act } from "@testing-library/react";
import useDeleteAllNotificationMessage from "@/domains/notification/hooks/useDeleteAllNotificationMessage";
import useDeleteAllNotificationMessagesMutate from "@/domains/notification/hooks/mutations/useDeleteAllNotificationMessagesMutate";
import { toast } from "react-toastify";
import { NotificationMessageData } from "@/domains/notification/types/notificationTypes";

jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  }
}));
jest.mock(
  "@/domains/notification/hooks/mutations/useDeleteAllNotificationMessagesMutate"
);

// confirm 모킹
const mockConfirm = (value: boolean) => {
  jest.spyOn(window, "confirm").mockImplementation(() => value);
};

describe("useDeleteAllNotificationMessage 훅 테스트", () => {
  const mockUseDeleteAllNotificationMessagesMutate =
    useDeleteAllNotificationMessagesMutate as jest.Mock;
  const mockMutate = jest.fn();
  const mockMessageData = [
    { id: "1", content: "알림입니다." }
  ] as NotificationMessageData[];

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseDeleteAllNotificationMessagesMutate.mockReturnValue({
      mutate: mockMutate
    });
  });

  it("messageData가 없을 경우 toast.warn 호출하여 메세지를 출력합니다.", () => {
    const { result } = renderHook(() =>
      useDeleteAllNotificationMessage({
        messageData: undefined,
        lastMessageKey: "abc"
      })
    );

    act(() => {
      result.current.onClickDeleteAll();
    });

    expect(toast.warn).toHaveBeenCalledWith("삭제할 알림 메세지가 없어요.");
    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("messageData가 빈 배열일 경우 toast.warn 호출하여 메세지를 출력합니다.", () => {
    const { result } = renderHook(() =>
      useDeleteAllNotificationMessage({
        messageData: [],
        lastMessageKey: "abc"
      })
    );

    act(() => {
      result.current.onClickDeleteAll();
    });

    expect(toast.warn).toHaveBeenCalledWith("삭제할 알림 메세지가 없어요.");
    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("confirm이 true일 경우 mutate 호출합니다.", () => {
    mockConfirm(true);

    const { result } = renderHook(() =>
      useDeleteAllNotificationMessage({
        messageData: mockMessageData,
        lastMessageKey: "abc"
      })
    );

    act(() => {
      result.current.onClickDeleteAll();
    });

    expect(mockMutate).toHaveBeenCalledWith("abc");
  });

  it("confirm이 false일 경우 mutate 호출되지 않습니다.", () => {
    mockConfirm(false);

    const { result } = renderHook(() =>
      useDeleteAllNotificationMessage({
        messageData: mockMessageData,
        lastMessageKey: "abc"
      })
    );

    act(() => {
      result.current.onClickDeleteAll();
    });

    expect(mockMutate).not.toHaveBeenCalled();
  });
});
