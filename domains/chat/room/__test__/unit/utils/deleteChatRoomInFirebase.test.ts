import deleteChatRoomInFirebase from "../../../utils/deleteChatRoomInFirebase";
import { getFirestoreDB } from "@/shared/common/utils/firebaseSetting";

jest.mock("@/shared/common/utils/firebaseSetting", () => ({
  getFirestoreDB: jest.fn()
}));

jest.mock("firebase/firestore", () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
  getDocs: jest.fn(),
  deleteDoc: jest.fn(),
  collection: jest.fn()
}));

import {
  doc,
  getDoc,
  getDocs,
  deleteDoc,
  collection
} from "firebase/firestore";

describe("deleteChatRoomInFirebase 함수 테스트", () => {
  const mockFirestoreDB = {};
  const mockChatRoomId = "test-room";

  beforeEach(() => {
    jest.clearAllMocks();
    (getFirestoreDB as jest.Mock).mockResolvedValue(mockFirestoreDB);
  });

  it("참여자가 없을 경우 메시지와 채팅방을 삭제합니다.", async () => {
    (doc as jest.Mock).mockReturnValue("chatRoomRef");
    (getDoc as jest.Mock).mockResolvedValue({
      exists: () => true,
      data: () => ({ participantIDs: [] })
    });

    const mockMessageDocs = [{ ref: "msgRef1" }, { ref: "msgRef2" }];

    (collection as jest.Mock).mockReturnValue("messagesCollection");
    (getDocs as jest.Mock).mockResolvedValue({ docs: mockMessageDocs });
    (deleteDoc as jest.Mock).mockResolvedValue(undefined);

    await deleteChatRoomInFirebase(mockChatRoomId);

    expect(getFirestoreDB).toHaveBeenCalled();
    expect(getDoc).toHaveBeenCalledWith("chatRoomRef");
    expect(getDocs).toHaveBeenCalledWith("messagesCollection");
    expect(deleteDoc).toHaveBeenCalledTimes(3); // 2 messages + 1 chat room
    expect(deleteDoc).toHaveBeenCalledWith("msgRef1");
    expect(deleteDoc).toHaveBeenCalledWith("msgRef2");
    expect(deleteDoc).toHaveBeenCalledWith("chatRoomRef");
  });

  it("참여자가 있는 경우 에러를 throw합니다.", async () => {
    (doc as jest.Mock).mockReturnValue("chatRoomRef");
    (getDoc as jest.Mock).mockResolvedValue({
      exists: () => true,
      data: () => ({ participantIDs: ["user123"] })
    });

    await expect(deleteChatRoomInFirebase(mockChatRoomId)).rejects.toThrow(
      "채팅방 참여 인원이 있어 채팅방을 삭제할 수 없어요."
    );

    expect(deleteDoc).not.toHaveBeenCalled();
  });

  it("채팅방이 존재하지 않으면 에러를 throw합니다.", async () => {
    (doc as jest.Mock).mockReturnValue("chatRoomRef");
    (getDoc as jest.Mock).mockResolvedValue({
      exists: () => false,
      data: () => ({ participantIDs: ["user123"] })
    });

    await expect(deleteChatRoomInFirebase(mockChatRoomId)).rejects.toThrow(
      "존재하지 않는 채팅방이에요."
    );

    expect(deleteDoc).not.toHaveBeenCalled();
  });
});
