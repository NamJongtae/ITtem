import startChatInFirebase from "../../../utils/startChatInFirebase";
import { getFirestoreDB } from "@/shared/common/utils/firebaseSetting";
import {
  collection,
  where,
  query,
  getDocs,
  addDoc,
  doc,
  setDoc
} from "firebase/firestore";

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(),
  addDoc: jest.fn(),
  doc: jest.fn(),
  setDoc: jest.fn(),
  arrayUnion: jest.fn((id) => `arrayUnion(${id})`),
  serverTimestamp: jest.fn(() => "MOCK_TIMESTAMP")
}));

jest.mock("@/shared/common/utils/firebaseSetting", () => ({
  getFirestoreDB: jest.fn()
}));

describe("startChatInFirebase 함수 테스트", () => {
  const mockFirestoreDB = {};
  const mockProductId = "product123";
  const mockMyUid = "user123";
  const mockUserUid = "otherUser123";
  const mockChatRoomId = "chatRoom123";
  const mockNewChatRoomId = "newChatRoom123";
  const mockCollection = { id: "mockCollection123" };

  beforeEach(() => {
    jest.clearAllMocks();
    (getFirestoreDB as jest.Mock).mockResolvedValue(mockFirestoreDB);
  });

  it("기존 채팅방이 있을 경우, 해당 채팅방 ID를 반환해야 합니다.", async () => {
    const mockSnapshot = {
      docs: [
        {
          id: mockChatRoomId,
          data: () => ({
            participantIDs: [mockMyUid, mockUserUid],
            productId: mockProductId
          })
        }
      ]
    };

    const whereProduct = `where(productId == ${mockProductId})`;
    const whereUser = `where(array-contains ${mockMyUid})`;

    (collection as jest.Mock).mockReturnValue(mockCollection);
    (where as jest.Mock)
      .mockImplementationOnce(() => whereProduct)
      .mockImplementationOnce(() => whereUser);
    (query as jest.Mock).mockReturnValue("mockQuery");
    (getDocs as jest.Mock).mockResolvedValue(mockSnapshot);

    const result = await startChatInFirebase({
      productId: mockProductId,
      myUid: mockMyUid,
      userId: mockUserUid
    });

    expect(getFirestoreDB).toHaveBeenCalled();
    expect(collection).toHaveBeenCalledWith(mockFirestoreDB, "chatRooms");
    expect(query).toHaveBeenCalledWith(mockCollection, whereProduct, whereUser);
    
    // startChatInFirebase 함수 반환 결과 확인
    expect(result).toEqual({
      chatRoomId: mockChatRoomId,
      isExistRoom: true
    });
  });

  it("채팅방이 없을 경우, 새로운 채팅방을 생성하고 ID를 반환해야 합니다.", async () => {
    const mockSnapshot = { docs: [] };
    (getDocs as jest.Mock).mockResolvedValue(mockSnapshot);

    const mockAddDocResult = { id: mockNewChatRoomId };
    (addDoc as jest.Mock).mockResolvedValue(mockAddDocResult);

    const userDocRef = { id: "userDocRef" };
    const myDocRef = { id: "myDocRef" };

    (collection as jest.Mock).mockReturnValue(mockCollection);
    (doc as jest.Mock)
      .mockImplementationOnce(() => userDocRef)
      .mockImplementationOnce(() => myDocRef);
    (setDoc as jest.Mock).mockResolvedValue(undefined);

    const result = await startChatInFirebase({
      productId: mockProductId,
      myUid: mockMyUid,
      userId: mockUserUid
    });

    expect(getFirestoreDB).toHaveBeenCalled();
    expect(collection).toHaveBeenCalledWith(mockFirestoreDB, "chatRooms");

    // 채팅방 생성 확인
    expect(addDoc).toHaveBeenCalledWith(mockCollection, {
      productId: mockProductId,
      participantIDs: [mockMyUid, mockUserUid],
      createdAt: "MOCK_TIMESTAMP",
      lastMessage: null,
      newMessageCount: {
        [mockMyUid]: 0,
        [mockUserUid]: 0
      },
      entered: {
        [mockMyUid]: false,
        [mockUserUid]: false
      },
      isAlarm: {
        [mockMyUid]: true,
        [mockUserUid]: true
      }
    });

    // 다른유저 채팅방정보에 채팅방 ID 및 총 메세지 카운터 저장 확인
    expect(setDoc).toHaveBeenCalledWith(
      userDocRef,
      {
        chatRoomIds: `arrayUnion(${mockNewChatRoomId})`,
        totalMessageCount: 0
      },
      { merge: true }
    );

    // 자신 채팅방 정보에 채팅방 ID 및 총 메세지 카운터 저장 확인
    expect(setDoc).toHaveBeenCalledWith(
      myDocRef,
      {
        chatRoomIds: `arrayUnion(${mockNewChatRoomId})`,
        totalMessageCount: 0
      },
      { merge: true }
    );

    // startChatInFirebase 함수 반환 결과 확인
    expect(result).toEqual({
      chatRoomId: mockNewChatRoomId,
      isExistRoom: false
    });
  });
});
