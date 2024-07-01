import dynamic from 'next/dynamic';
import { MetaData } from '@/types/metaDataTypes';
import { getDynamicMetaData } from '@/lib/getDynamicMetaData';
import DynamicMetaHead from '@/components/dynamicMetaHead/dynamic-meta-head';
import { withAuthServerSideProps } from '@/lib/withAuthServerSideProps';
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

export const getServerSideProps = withAuthServerSideProps(async (context) => {
  const { resolvedUrl } = context;
  const metaData = getDynamicMetaData({
    url: resolvedUrl,
    title: "채팅",
  });

  return {
    props: { metaData },
  };
});
