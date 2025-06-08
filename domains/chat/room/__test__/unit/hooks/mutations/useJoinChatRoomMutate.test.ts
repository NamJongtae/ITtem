import { renderHook, act } from "@testing-library/react";
import useJoinChatRoomMutate from "@/domains/chat/room/hooks/mutations/useJoinChatRoomMutate";
import joinChatRoom from "@/domains/chat/room/api/joinChatRoom";
import { AxiosError } from "axios";
import { createQueryClientWrapper } from "@/shared/__mocks__/utils/testQueryClientWrapper";

jest.mock("@/domains/chat/room/api/joinChatRoom");

describe("useJoinChatRoomMutate 훅 테스트", () => {
  const { Wrapper: wrapper } = createQueryClientWrapper();
  const mockChatRoomId = "room123";
  const mockJoinChatRoom = joinChatRoom as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("joinChatRoom 호출 시 chatRoomId를 전달하고 응답을 반환합니다.", async () => {
    const response = { data: { message: "입장 완료" } };
    mockJoinChatRoom.mockResolvedValueOnce(response);

    const { result } = renderHook(() => useJoinChatRoomMutate(), { wrapper });

    let resultData;
    await act(async () => {
      resultData = await result.current.joinChatRoomMutate(mockChatRoomId);
    });

    expect(mockJoinChatRoom).toHaveBeenCalledWith(mockChatRoomId);
    expect(resultData).toEqual(response);
  });

  it("joinChatRoom 호출 실패 시 에러를 던집니다.", async () => {
    const error = new AxiosError("입장 실패");
    mockJoinChatRoom.mockRejectedValueOnce(error);

    const { result } = renderHook(() => useJoinChatRoomMutate(), { wrapper });

    await act(async () => {
      await expect(
        result.current.joinChatRoomMutate(mockChatRoomId)
      ).rejects.toThrow("입장 실패");
    });
  });
});
