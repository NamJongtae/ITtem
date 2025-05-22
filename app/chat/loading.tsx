import ChatRoomListSkeletonUI from "@/domains/chat/components/room-list/chat-room-list-SkeletonUI";

export default function ChatLoading() {
  return (
    <div className="w-full max-w-[calc(1024px-32px)] md:max-w-[calc(1024px-64px)] mx-auto h-[calc(100vh-176px-53px)] md:h-[calc(100vh-126px-53px)] border-0 md:border-l md:border-r ">
      {/* 채팅 목록 헤더 */}
      <div className="px-5 py-3 font-semibold text-lg">채팅</div>

      {/* 채팅 목록 */}
      <ChatRoomListSkeletonUI />
    </div>
  );
}
