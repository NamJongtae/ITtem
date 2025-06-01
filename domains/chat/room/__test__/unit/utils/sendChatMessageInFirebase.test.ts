import sendToChatMessageInFirebase from "../../../utils/sendChatMessageInFirebase";
import { getFirestoreDB } from "@/shared/common/utils/firebaseSetting";

jest.mock("@/shared/common/utils/firebaseSetting", () => ({
  getFirestoreDB: jest.fn()
}));

jest.mock("firebase/firestore", () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
  addDoc: jest.fn(),
  updateDoc: jest.fn(),
  collection: jest.fn(),
  serverTimestamp: jest.fn(() => "MOCK_TIMESTAMP"),
  increment: jest.fn((val) => `increment(${val})`)
}));

import { doc, getDoc, addDoc, updateDoc, collection } from "firebase/firestore";

describe("sendToChatMessageInFirebase", () => {
  const mockMyUid = "user123";
  const mockOtherUserUid = "otherUser123";
  const mockChatRoomId = "room789";
  const mockFirestoreDB = {};

  const chatRoomRef = { id: "chatRoomRef" };
  const userChatInfoRef = { id: "userChatInfoRef" };
  const messagesCollectionRef = { id: "messagesRef" };

  const baseChatRoomData = {
    entered: {
      [mockMyUid]: true,
      [mockOtherUserUid]: false
    },
    participantIDs: [mockMyUid, mockOtherUserUid],
    newMessageCount: {
      [mockOtherUserUid]: 0
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (getFirestoreDB as jest.Mock).mockResolvedValue(mockFirestoreDB);

    (doc as jest.Mock).mockImplementation((_, path) => {
      if (path === `chatRooms/${mockChatRoomId}`) return chatRoomRef;
      if (path === `userChatInfo/${mockOtherUserUid}`) return userChatInfoRef;
    });

    (collection as jest.Mock).mockReturnValue(messagesCollectionRef);

    (getDoc as jest.Mock).mockResolvedValue({
      exists: () => true,
      data: () => baseChatRoomData
    });
  });

  it("정상적으로 메시지를 전송하고 Firestore에 업데이트합니다.", async () => {
    await sendToChatMessageInFirebase({
      myUid: mockMyUid,
      chatRoomId: mockChatRoomId,
      message: "안녕하세요"
    });

    expect(addDoc).toHaveBeenCalledWith(messagesCollectionRef, {
      content: "안녕하세요",
      timestamp: "MOCK_TIMESTAMP",
      senderId: mockMyUid,
      isNotification: false
    });

    expect(updateDoc).toHaveBeenCalledWith(userChatInfoRef, {
      totalMessageCount: "increment(1)"
    });

    expect(updateDoc).toHaveBeenCalledWith(chatRoomRef, {
      lastMessage: {
        content: "안녕하세요",
        timestamp: "MOCK_TIMESTAMP",
        senderId: mockMyUid,
        isNotification: false
      },
      [`newMessageCount.${mockOtherUserUid}`]: "increment(1)"
    });
  });

  it("채팅방이 존재하지 않으면 에러를 throw합니다.", async () => {
    (getDoc as jest.Mock).mockResolvedValueOnce({
      exists: () => false,
      data: () => baseChatRoomData
    });

    await expect(
      sendToChatMessageInFirebase({
        myUid: mockMyUid,
        chatRoomId: mockChatRoomId,
        message: "안녕"
      })
    ).rejects.toThrow("존재하지 않는 채팅방이에요.");
  });

  it("내 uid가 entered에 없으면 에러를 throw합니다.", async () => {
    (getDoc as jest.Mock).mockResolvedValueOnce({
      exists: () => true,
      data: () => ({
        ...baseChatRoomData,
        entered: { [mockOtherUserUid]: true }, // 내 uid 없음
        participantIDs: [mockOtherUserUid]
      })
    });

    await expect(
      sendToChatMessageInFirebase({
        myUid: mockMyUid,
        chatRoomId: mockChatRoomId,
        message: "하이"
      })
    ).rejects.toThrow("잘못된 접근이에요.");
  });
});
