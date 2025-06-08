import { renderHook, act } from "@testing-library/react";
import useReadNotificationMessage from "@/domains/notification/hooks/useReadNotificationMessage";
import useReadNotificationMessageMutate from "@/domains/notification/hooks/mutations/useReadNotificationMessageMutate";

jest.mock(
  "@/domains/notification/hooks/mutations/useReadNotificationMessageMutate"
);

describe("useReadNotificationMessage 훅 테스트", () => {
  const mockUseReadNotificationMessageMutate =
    useReadNotificationMessageMutate as jest.Mock;
  const mockMutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseReadNotificationMessageMutate.mockReturnValue({
      mutate: mockMutate
    });
  });

  it("onClickRead 호출 시 messageId를 전달하여 mutate가 호출됩니다.", () => {
    const { result } = renderHook(() =>
      useReadNotificationMessage({ messageId: "msg123" })
    );

    act(() => {
      result.current.onClickRead();
    });

    expect(mockMutate).toHaveBeenCalledWith("msg123");
  });
});
