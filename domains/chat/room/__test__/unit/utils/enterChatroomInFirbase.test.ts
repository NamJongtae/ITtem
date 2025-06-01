import enterChatRoomInFirebase from "../../../utils/enterChatRoomInFirebase";
import { getFirestoreDB } from "@/shared/common/utils/firebaseSetting";

jest.mock("@/shared/common/utils/firebaseSetting", () => ({
  getFirestoreDB: jest.fn()
}));

jest.mock("firebase/firestore", () => ({
  getDoc: jest.fn(),
  updateDoc: jest.fn(),
  doc: jest.fn(),
  arrayUnion: jest.fn((v) => `arrayUnion(${v})`),
  increment: jest.fn((v) => `increment(${v})`)
}));

import {
  getDoc,
  updateDoc,
  doc,
  arrayUnion,
  increment
} from "firebase/firestore";

describe("enterChatRoomInFirbase 함수 테스트", () => {
  const mockFirestoreDB = {};
  const mockChatRoomId = "test-room";
  const mockMyUid = "user123";
  const mockOtherUserUid = "otherUser123";
  const chatRoomRef = { id: "chatRoomRef" };
  const myChatInfoRef = { id: "myChatInfoRef" };
  const basechatRoomData = {
    entered: { [mockMyUid]: false, [mockOtherUserUid]: false },
    participantIDs: [],
    newMessageCount: { [mockMyUid]: 3, [mockOtherUserUid]: 0 }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (getFirestoreDB as jest.Mock).mockResolvedValue(mockFirestoreDB);
  });

  it("정상적으로 채팅방에 입장하면 모든 업데이트가 실행됩니다.", async () => {
    (doc as jest.Mock).mockImplementation((firestoreDB, path) => {
      if (path === `chatRooms/${mockChatRoomId}`) {
        return chatRoomRef;
      }

      if (path === `userChatInfo/${mockMyUid}`) {
        return myChatInfoRef;
      }
    });

    (getDoc as jest.Mock).mockResolvedValue({
      exists: () => true,
      data: () => basechatRoomData
    });

    await enterChatRoomInFirebase({
      myUid: mockMyUid,
      chatRoomId: mockChatRoomId
    });

    expect(updateDoc).toHaveBeenCalledWith(chatRoomRef, {
      [`entered.${mockMyUid}`]: true
    });
    expect(updateDoc).toHaveBeenCalledWith(myChatInfoRef, {
      chatRoomIds: arrayUnion(mockChatRoomId)
    });
    expect(updateDoc).toHaveBeenCalledWith(chatRoomRef, {
      participantIDs: arrayUnion(mockMyUid)
    });
    expect(updateDoc).toHaveBeenCalledWith(myChatInfoRef, {
      totalMessageCount: increment(-3)
    });
    expect(updateDoc).toHaveBeenCalledWith(chatRoomRef, {
      [`newMessageCount.${mockMyUid}`]: 0
    });
  });

  it("채팅방이 존재하지 않으면 에러를 throw합니다.", async () => {
    (getDoc as jest.Mock).mockResolvedValue({
      exists: () => false,
      data: () => ({})
    });

    await expect(
      enterChatRoomInFirebase({ myUid: mockMyUid, chatRoomId: mockChatRoomId })
    ).rejects.toThrow("존재하지 않는 채팅방이에요.");
    expect(updateDoc).not.toHaveBeenCalled();
  });

  it("entered에 myUid가 존재하지 않으면 에러를 throw합니다.", async () => {
    (getDoc as jest.Mock).mockResolvedValue({
      exists: () => true,
      data: () => ({
        ...basechatRoomData,
        entered: [mockOtherUserUid] // ⚠️ myUid가 없음
      })
    });

    await expect(
      enterChatRoomInFirebase({ myUid: mockMyUid, chatRoomId: mockChatRoomId })
    ).rejects.toThrow("잘못된 접근이에요.");
    expect(updateDoc).not.toHaveBeenCalled();
  });

  it("newMessageCount 정보가 없으면 에러를 throw합니다.", async () => {
    (getDoc as jest.Mock).mockResolvedValue({
      exists: () => true,
      data: () => ({
        ...basechatRoomData,
        newMessageCount: { [mockOtherUserUid]: 0 } // myUid 없음
      })
    });

    await expect(
      enterChatRoomInFirebase({
        myUid: mockChatRoomId,
        chatRoomId: mockChatRoomId
      })
    ).rejects.toThrow("잘못된 접근이에요.");
    expect(updateDoc).not.toHaveBeenCalled();
  });
});
