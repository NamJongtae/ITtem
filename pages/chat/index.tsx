import dynamic from 'next/dynamic';
import { getDynamicMetaDataURL } from "@/lib/getDynamicMetaData";
import DynamicMetaHead from '@/components/dynamicMetaHead/dynamic-meta-head';
import { withAuthServerSideProps } from '@/lib/withAuthServerSideProps';
const ChatRoomListPage = dynamic(() => import('@/components/chat/chatRoomListPage/chat-room-list-page'));

export default function ChatRooms() {
  return (
    <>
      <DynamicMetaHead title="채팅목록" url={getDynamicMetaDataURL("chat")} />
      <ChatRoomListPage />
    </>
  );
}

export const getServerSideProps = withAuthServerSideProps(
  async (context) => {
    return { props: {} };
  }
);
