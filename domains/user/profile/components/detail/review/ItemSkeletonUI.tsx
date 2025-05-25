import Image from "next/image";

export default function ItemSkeletonUI() {
  return (
    <li className="animate-pulse flex gap-4 border-b pb-5 px-5">
      <Image
        className="rounded-full w-14 h-14 object-cover object-center bg-gray-300"
        src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        width={56}
        height={56}
        alt="loading..."
      />
      <div className="flex flex-col mb-3">
        <div className="w-24 h-[14px] bg-gray-300 mb-2"></div>
        <div className="w-32 h-[14px] bg-gray-300 mb-2"></div>
        <div className="w-32 h-[20px] bg-gray-300 mb-2"></div>
        <div className="w-full h-[14px] bg-gray-300 mb-4"></div>
        <div className="flex gap-3">
          <div className="w-32 h-[14px] bg-gray-300"></div>
          <div className="w-20 h-[14px] bg-gray-300"></div>
        </div>
      </div>
    </li>
  );
}
