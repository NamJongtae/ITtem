import { renderHook, act } from "@testing-library/react";
import { createRef } from "react";
import useChatRoomFormLogic from "../../../hooks/useChatRoomFormLogic";
import useSendChatMessageMuate from "../../../hooks/mutations/useSendChatMessageMutate";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

jest.mock("next/navigation", () => ({
  useParams: jest.fn()
}));

jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn()
  }
}));

jest.mock("../../../hooks/mutations/useSendChatMessageMutate");

const mockMutate = jest.fn();
const mockToastWarn = toast.warn as jest.Mock;

const createMockChatListRef = () => {
  const ulElement = document.createElement("ul");
  const ref = createRef<HTMLUListElement>();
  ref.current = ulElement;
  return ref;
};

beforeEach(() => {
  jest.clearAllMocks();

  (useParams as jest.Mock).mockReturnValue({
    chatRoomId: "test-room-id"
  });
});

describe("useChatRoomFormLogic 훅 테스트", () => {
  it("빈 메시지를 전송하면 경고 메시지를 출력하고 mutate는 호출되지 않는다", () => {
    (useSendChatMessageMuate as jest.Mock).mockImplementation(() => ({
      mutate: mockMutate
    }));

    const { result } = renderHook(() =>
      useChatRoomFormLogic({ chatListRef: createMockChatListRef() })
    );

    act(() => {
      result.current.onSumbitMessage({ message: "" });
    });

    expect(mockToastWarn).toHaveBeenCalledWith("메세지를 입력해주세요.");
    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("메시지를 전송하면 mutate가 호출되고 resetField도 실행됩니다.", () => {
    (useSendChatMessageMuate as jest.Mock).mockImplementation(() => ({
      mutate: mockMutate
    }));

    const { result } = renderHook(() =>
      useChatRoomFormLogic({ chatListRef: createMockChatListRef() })
    );

    act(() => {
      result.current.onSumbitMessage({ message: "안녕하세요." });
    });

    expect(mockMutate).toHaveBeenCalledWith({
      chatRoomId: "test-room-id",
      message: "안녕하세요."
    });
  });

  it("isDisable이 true이면 버튼은 비활성화됩니다.", () => {
    (useSendChatMessageMuate as jest.Mock).mockImplementation(() => ({
      mutate: mockMutate
    }));

    const { result } = renderHook(() =>
      useChatRoomFormLogic({ chatListRef: createMockChatListRef() })
    );

    expect(result.current.isDisable).toBe(true);
  });
});
