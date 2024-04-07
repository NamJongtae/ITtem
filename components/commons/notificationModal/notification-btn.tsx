export default function NotificationBtn() {
  return (
    <div className="flex gap-1 justify-end mr-3 mt-1">
      <button className="relative text-[11px] before:bg-gray-400 before:absolute before:h-[11px] before:w-[1px] before:-right-1 before:top-1">
        모두 읽음
      </button>
      <button className="text-[11px] ml-1">모두 삭제</button>
    </div>
  );
}
