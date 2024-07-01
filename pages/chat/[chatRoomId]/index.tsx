import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import { MetaData } from '@/types/metaDataTypes';
import { getDynamicMetaData } from '@/lib/getDynamicMetaData';
import DynamicMetaHead from '@/components/dynamicMetaHead/dynamic-meta-head';
const ChatRoomPage = dynamic(() => import('@/components/chat/chatRoomPage/chat-room-page'));

interface IProps {
  metaData: MetaData;
}
export default function ChatRoom({ metaData }: IProps) {
  return (
    <>
      <DynamicMetaHead {...metaData} />
      <ChatRoomPage />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { resolvedUrl } = context;
  const metaData = getDynamicMetaData({
    url: resolvedUrl,
    title: "채팅",
  });

  return {
    props: { metaData },
  };
};
