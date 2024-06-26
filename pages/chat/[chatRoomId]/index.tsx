import ChatRoomPage from "@/components/chat/chatRoomPage/chat-room-page";
import DynamicMetaHead from "@/components/dynamicMetaHead/dynamic-meta-head";
import { GetServerSideProps } from "next";
import { MetaData } from "@/types/metaDataTypes";
import { getDynamicMetaData } from "@/lib/getDynamicMetaData";

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
