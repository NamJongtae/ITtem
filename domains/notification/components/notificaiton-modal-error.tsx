import Empty from "@/components/empty";

export default function NotificaitonModalError() {
  return (
    <Empty
      message={"알림 메세지를 조회에 실패했어요.\n 잠시 후 다시 시도해주세요."}
      messageSize="sm"
      iconSize={50}
    />
  );
}
