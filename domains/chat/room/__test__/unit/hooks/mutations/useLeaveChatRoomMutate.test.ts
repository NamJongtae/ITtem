import { renderHook, act } from "@testing-library/react";
import useLeaveChatRoomMutate from "@/domains/chat/room/hooks/mutations/useLeaveChatRoomMutate";
import leaveChatRoom from "@/domains/chat/room/api/leaveChatRoom";
import { AxiosError } from "axios";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";

jest.mock("@/domains/chat/room/api/leaveChatRoom");

describe("useLeaveChatRoomMutate", () => {
  const { Wrapper: wrapper } = createQueryClientWrapper();
  const mockChatRoomId = "room123";
  const mockLeaveChatRoom = leaveChatRoom as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("leaveChatRoom 호출 시 chatRoomId를 전달하고 응답을 반환합니다.", async () => {
    const response = { data: { message: "나가기 완료" } };
    mockLeaveChatRoom.mockResolvedValueOnce(response);

    const { result } = renderHook(() => useLeaveChatRoomMutate(), { wrapper });

    let resultData;
    await act(async () => {
      resultData = await result.current.leaveChatRoomMutate(mockChatRoomId);
    });

    expect(mockLeaveChatRoom).toHaveBeenCalledWith(mockChatRoomId);
    expect(resultData).toEqual(response);
  });

  it("leaveChatRoom 호출 실패 시 에러를 던집니다.", async () => {
    const error = new AxiosError("나가기 실패");
    mockLeaveChatRoom.mockRejectedValueOnce(error);

    const { result } = renderHook(() => useLeaveChatRoomMutate(), { wrapper });

    await act(async () => {
      await expect(
        result.current.leaveChatRoomMutate(mockChatRoomId)
      ).rejects.toThrow("나가기 실패");
    });
  });
});
