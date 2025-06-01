import exitChatRoomInFirebase from "../../../utils/exitChatRoomInFirebase";
import { getFirestoreDB } from "@/shared/common/utils/firebaseSetting";

jest.mock("@/shared/common/utils/firebaseSetting", () => ({
  getFirestoreDB: jest.fn()
}));

jest.mock("firebase/firestore", () => ({
  getDoc: jest.fn(),
  updateDoc: jest.fn(),
  doc: jest.fn(),
  arrayRemove: jest.fn((v) => `arrayRemove(${v})`)
}));

import { getDoc, updateDoc, doc, arrayRemove } from "firebase/firestore";

describe("enterChatRoomInFirbase 함수 테스트", () => {
  const mockFirestoreDB = {};
  const mockChatRoomId = "test-room";
  const mockMyUid = "user123";
  const mockOtherUserUid = "otherUser123";
  const mockChatRoomRef = { id: "chatRoomRef" };
  const mockUserChatInfoRef = { id: "userChatInfoRef" };
  const basechatRoomData = {
    entered: { [mockMyUid]: true },
    participantIDs: [mockMyUid],
    newMessageCount: { [mockMyUid]: 0 }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (getFirestoreDB as jest.Mock).mockResolvedValue(mockFirestoreDB);
  });

  it("정상적으로 채팅방을 나가면 모든 업데이트가 실행됩니다.", async () => {
    (doc as jest.Mock).mockImplementation((firestoreDB, path) => {
      if (path === `chatRooms/${mockChatRoomId}`) {
        return mockChatRoomRef;
      }

      if (path === `userChatInfo/${mockMyUid}`) {
        return mockUserChatInfoRef;
      }
    });

    (getDoc as jest.Mock).mockImplementation(() => {
      return Promise.resolve({
        exists: () => true,
        data: () => basechatRoomData
      });
    });

    await exitChatRoomInFirebase({
      myUid: mockMyUid,
      chatRoomId: mockChatRoomId
    });

    expect(updateDoc).toHaveBeenCalledWith(mockChatRoomRef, {
      participantIDs: arrayRemove(mockMyUid)
    });
    expect(updateDoc).toHaveBeenCalledWith(mockUserChatInfoRef, {
      chatRoomIds: arrayRemove(mockChatRoomId)
    });
    expect(updateDoc).toHaveBeenCalledTimes(2);
  });

  it("채팅방이 존재하지 않으면 에러를 throw합니다.", async () => {
    (getDoc as jest.Mock).mockResolvedValue({
      exists: () => false,
      data: () => ({})
    });

    await expect(
      exitChatRoomInFirebase({ myUid: mockMyUid, chatRoomId: mockChatRoomId })
    ).rejects.toThrow("존재하지 않는 채팅방이에요.");
    expect(updateDoc).not.toHaveBeenCalled();
  });

  it("participantIDs에 myUid가 존재하지 않으면 에러를 throw합니다.", async () => {
    (getDoc as jest.Mock).mockImplementation((ref) => {
      if (ref === mockChatRoomRef) {
        return Promise.resolve({
          exists: () => true,
          data: () => ({
            ...basechatRoomData,
            participantIDs: [mockOtherUserUid]
          })
        });
      }
      if (ref === mockUserChatInfoRef) {
        return Promise.resolve({
          exists: () => true,
          data: () => ({})
        });
      }
    });

    await expect(
      exitChatRoomInFirebase({ myUid: mockMyUid, chatRoomId: mockChatRoomId })
    ).rejects.toThrow("잘못된 접근이에요.");
    expect(updateDoc).not.toHaveBeenCalled();
  });

  it("유저 채팅 정보가 없으면 에러를 throw합니다.", async () => {
    (getDoc as jest.Mock).mockImplementation((ref) => {
      if (ref === mockChatRoomRef) {
        return Promise.resolve({
          exists: () => true,
          data: () => basechatRoomData
        });
      }
      if (ref === mockUserChatInfoRef) {
        return Promise.resolve({ exists: () => false });
      }
    });

    await expect(
      exitChatRoomInFirebase({
        myUid: mockMyUid,
        chatRoomId: mockChatRoomId
      })
    ).rejects.toThrow("채팅방 유저 정보가 존재하지 않아요.");
    expect(updateDoc).not.toHaveBeenCalled();
  });
});
