export default function ChatRoomListSkeletonUI() {
  return (
    <div className="animate-pulse flex flex-col gap-5 overflow-y-auto p-5 max-h-[calc(100vh-301px)] md:max-h-[calc(100vh-237px)]">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="bg-gray-200 w-full h-[60px] shrink-0" />
      ))}
    </div>
  );
}
