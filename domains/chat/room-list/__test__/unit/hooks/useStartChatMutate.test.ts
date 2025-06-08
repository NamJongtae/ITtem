import { renderHook, act, waitFor } from "@testing-library/react";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import startChat from "../../../api/startChat";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";
import useStartChatMutate from "../../../hooks/mutations/useStartChatMutate";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn()
}));

jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  }
}));

jest.mock("../../../api/startChat");

describe("useStartChatMutate", () => {
  const { Wrapper: wrapper } = createQueryClientWrapper();
  const mockRouterpush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterpush });
    jest.clearAllMocks();
  });

  it("성공 시 chatRoomId로 라우팅한다", async () => {
    const mockChatRoomId = "1234";
    const mockResponse = {
      data: {
        chatRoomId: mockChatRoomId
      }
    };

    (startChat as jest.Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useStartChatMutate(), {
      wrapper
    });

    act(() => {
      result.current.mutate({ productId: "1", userId: "user" });
    });

    await waitFor(() => {
      expect(mockRouterpush).toHaveBeenCalledWith(`/chat/${mockChatRoomId}`);
    });
  });

  it("에러 발생 시 토스트를 띄운다", async () => {
    (startChat as jest.Mock).mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useStartChatMutate(), {
      wrapper
    });

    act(() => {
      result.current.mutate({ productId: "1", userId: "user" });
    });

    await waitFor(() => {
      expect(toast.warn).toHaveBeenCalledWith(
        "채팅방 이동에 실패했어요.\n잠시 후 다시 시도해주세요."
      );
    });
  });
});
