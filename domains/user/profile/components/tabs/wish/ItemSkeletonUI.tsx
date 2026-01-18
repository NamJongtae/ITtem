import Image from "next/image";

export default function ItemSkeletonUI() {
  return (
    <li className="animate-pulse border rounded">
      <div className="flex gap-3 w-full">
        <Image
          className="w-32 h-32 border-r bg-gray-200"
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          width={56}
          height={56}
          alt="loading..."
        />
        <div className="flex flex-col gap-3 px-4 py-2">
          <div className="w-32 h-[14px] bg-gray-300 mb-2 rounded"></div>
          <div className="h-[14px] bg-gray-300 mb-1 rounded"></div>
          <div className="h-[14px] bg-gray-300 mb-1 rounded" ></div>
          <div className="w-20 h-[14px] bg-gray-300 rounded"></div>
        </div>
      </div>
    </li>
  );
}
