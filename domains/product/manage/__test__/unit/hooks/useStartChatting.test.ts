import { renderHook, act } from "@testing-library/react";
import useStartChatting from "../../../hooks/useStartChatting";
import * as mutateModule from "@/domains/chat/room-list/hooks/mutations/useStartChatMutate";

jest.mock("@/domains/chat/room-list/hooks/mutations/useStartChatMutate");

describe("useStartChatting 훅 테스트", () => {
  const mockMutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (mutateModule.default as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false
    });
  });

  it("productId와 userId가 존재할 때 mutate가 호출됩니다.", () => {
    const { result } = renderHook(() =>
      useStartChatting({
        productId: "product123",
        userId: "user123"
      })
    );

    act(() => {
      result.current.startChatting();
    });

    expect(mockMutate).toHaveBeenCalledWith({
      productId: "product123",
      userId: "user123"
    });
  });

  it("productId가 undefined일 때 mutate가 호출되지 않습니다.", () => {
    const { result } = renderHook(() =>
      useStartChatting({
        productId: undefined,
        userId: "user123"
      })
    );

    act(() => {
      result.current.startChatting();
    });

    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("userId가 undefined일 때 mutate가 호출되지 않습니다.", () => {
    const { result } = renderHook(() =>
      useStartChatting({
        productId: "product123",
        userId: undefined
      })
    );

    act(() => {
      result.current.startChatting();
    });

    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("isPending 상태가 반환되는지 확인합니다.", () => {
    (mutateModule.default as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: true
    });

    const { result } = renderHook(() =>
      useStartChatting({
        productId: "product123",
        userId: "user123"
      })
    );

    expect(result.current.isPending).toBe(true);
  });
});
