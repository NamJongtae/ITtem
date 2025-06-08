import { renderHook, act } from "@testing-library/react";
import useDeleteNotificationMessage from "@/domains/notification/hooks/useDeleteNotificationMessage";
import useDeleteNotificationMessageMutate from "@/domains/notification/hooks/mutations/useDeleteNotificationMessageMutate";

jest.mock(
  "@/domains/notification/hooks/mutations/useDeleteNotificationMessageMutate"
);
// window.confirm 모킹 함수
const mockConfirm = (value: boolean) => {
  jest.spyOn(window, "confirm").mockImplementation(() => value);
};

describe("useDeleteNotificationMessage 훅 테스트", () => {
  const mockMutate = jest.fn();
  const mockUseDeleteNotificationMessageMutate =
    useDeleteNotificationMessageMutate as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseDeleteNotificationMessageMutate.mockReturnValue({
      mutate: mockMutate
    });
  });

  it("confirm이 true일 때 mutate가 호출됩니다.", () => {
    mockConfirm(true);

    const { result } = renderHook(() =>
      useDeleteNotificationMessage({ messageId: "msg123" })
    );

    act(() => {
      result.current.onClickDelete();
    });

    expect(mockMutate).toHaveBeenCalledWith("msg123");
  });

  it("confirm이 false일 때 mutate가 호출되지 않습니다.", () => {
    mockConfirm(false);

    const { result } = renderHook(() =>
      useDeleteNotificationMessage({ messageId: "msg123" })
    );

    act(() => {
      result.current.onClickDelete();
    });

    expect(mockMutate).not.toHaveBeenCalled();
  });
});
