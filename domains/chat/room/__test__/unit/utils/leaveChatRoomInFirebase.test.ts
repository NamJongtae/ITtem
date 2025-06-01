import leaveChatRoomInFirebase from "../../../utils/leaveChatRoomInFirebase";
import { getFirestoreDB } from "@/shared/common/utils/firebaseSetting";

jest.mock("@/shared/common/utils/firebaseSetting", () => ({
  getFirestoreDB: jest.fn()
}));

jest.mock("firebase/firestore", () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
  updateDoc: jest.fn()
}));

import { doc, getDoc, updateDoc } from "firebase/firestore";

describe("leaveChatRoomInFirebase", () => {
  const mockFirestoreDB = {};
  const mockChatRoomId = "test-room";
  const mockMyUid = "user123";
  const mockOtherUserUid = "otherUserUid123";
  const mockChatRoomRef = { id: "chatRoomRef" };

  beforeEach(() => {
    jest.clearAllMocks();
    (getFirestoreDB as jest.Mock).mockResolvedValue(mockFirestoreDB);
    (doc as jest.Mock).mockImplementation((_, path) => {
      if (path === `chatRooms/${mockChatRoomId}`) return mockChatRoomRef;
    });
  });

  it("채팅방에 정상적으로 나가면 entered 필드가 false로 업데이트 됩니다.", async () => {
    (getDoc as jest.Mock).mockResolvedValue({
      exists: () => true,
      data: () => ({
        entered: {
          [mockMyUid]: true,
          [mockOtherUserUid]: true
        }
      })
    });

    await leaveChatRoomInFirebase({
      myUid: mockMyUid,
      chatRoomId: mockChatRoomId
    });

    expect(updateDoc).toHaveBeenCalledWith(mockChatRoomRef, {
      [`entered.${mockMyUid}`]: false
    });
  });

  it("채팅방이 존재하지 않으면 에러를 throw합니다.", async () => {
    (getDoc as jest.Mock).mockResolvedValue({
      exists: () => false,
      data: () => ({})
    });

    await expect(
      leaveChatRoomInFirebase({ myUid: mockMyUid, chatRoomId: mockChatRoomId })
    ).rejects.toThrow("존재하지 않는 채팅방이에요.");

    expect(updateDoc).not.toHaveBeenCalled();
  });

  it("entered 정보에 myUid가 없으면 에러를 throw합니다.", async () => {
    (getDoc as jest.Mock).mockResolvedValue({
      exists: () => true,
      data: () => ({
        entered: {
          [mockOtherUserUid]: true
        }
      })
    });

    await expect(
      leaveChatRoomInFirebase({ myUid: mockMyUid, chatRoomId: mockChatRoomId })
    ).rejects.toThrow("잘못된 접근이에요.");

    expect(updateDoc).not.toHaveBeenCalled();
  });
});
