import ChatRoomPage from "@/components/chat/chatRoomPage/chat-room-page";
import MetaHead from "@/components/metaHead/meta-head";
import { GetServerSideProps } from "next";
import { MetaData } from "@/types/metaDataTypes";
import { getMetaData } from "@/lib/getMetaData";

interface IProps {
  metaData: MetaData;
}
export default function ChatRoom({ metaData }: IProps) {
  return (
    <>
      <MetaHead {...metaData} />
      <ChatRoomPage />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { resolvedUrl } = context;
  const metaData = getMetaData({
    url: resolvedUrl,
    title: "채팅",
  });

  return {
    props: { metaData },
  };
};
