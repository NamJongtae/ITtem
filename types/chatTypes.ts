import { Timestamp } from "firebase/firestore";

export interface ChatMessageData {
  senderId: string;
  timestamp: Timestamp;
  content: string;
}

export interface ChatRoomData {
  createdAt: number;
  entered: {
    [userId: string]: boolean;
  };
  isAlarm: {
    [userId: string]: boolean;
  };
  messages: {
    [messageId: string]: {
      content: string;
      senderId: string;
      timestamp: Timestamp;
    };
  };
  newMessageCount: {
    [userId: string]: number;
  };
  participantIDs: string[];
  productId: string;
  lastMessage?: ChatMessageData;
}
